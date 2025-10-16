import {TestBed} from '@angular/core/testing';
import {Router, UrlTree} from '@angular/router';
import {of, isObservable} from 'rxjs';
import {authRequiredGuard} from './auth-required.guard';
import {AuthUserService} from '../services/auth-user.service';
import {ToastService} from '../services/toast.service';

/**
 * Unit tests for authRequiredGuard.
 * Tests authentication requirement enforcement.
 */
describe('authRequiredGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthUserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToast: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthUserService', [], {
      authState$: of(null),
    });
    mockRouter = jasmine.createSpyObj('Router', ['createUrlTree']);
    mockToast = jasmine.createSpyObj('ToastService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthUserService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter},
        {provide: ToastService, useValue: mockToast},
      ],
    });
  });

  it('should allow access when user is authenticated', (done) => {
    const mockUser = {uid: 'test-uid', email: 'test@example.com'};
    Object.defineProperty(mockAuthService, 'authState$', {
      get: () => of(mockUser),
    });

    TestBed.runInInjectionContext(() => {
      const result = authRequiredGuard({} as any, {} as any);

      if (typeof result === 'boolean') {
        expect(result).toBeTrue();
        done();
      } else if (result instanceof UrlTree) {
        fail('Should not return UrlTree for authenticated user');
        done();
      } else if (isObservable(result)) {
        result.subscribe((allowed) => {
          expect(allowed).toBeTrue();
          done();
        });
      } else {
        fail('Unexpected return type from guard');
        done();
      }
    });
  });

  it('should block access when user is not authenticated', (done) => {
    Object.defineProperty(mockAuthService, 'authState$', {
      get: () => of(null),
    });

    const mockUrlTree = {} as UrlTree;
    mockRouter.createUrlTree.and.returnValue(mockUrlTree);

    TestBed.runInInjectionContext(() => {
      const result = authRequiredGuard({} as any, {} as any);

      if (typeof result === 'boolean') {
        expect(result).toBeFalse();
        done();
      } else if (result instanceof UrlTree) {
        expect(mockToast.error).toHaveBeenCalled();
        expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
        done();
      } else if (isObservable(result)) {
        result.subscribe((allowed) => {
          expect(mockToast.error).toHaveBeenCalled();
          expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
          expect(allowed === mockUrlTree).toBeTrue();
          done();
        });
      } else {
        fail('Unexpected return type from guard');
        done();
      }
    });
  });
});
