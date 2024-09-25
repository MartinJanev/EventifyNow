import {ChangeDetectorRef, Component, ElementRef, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventDataComponent} from '../event-data/event-data.component';
import {Eventdata} from '../../interface/event-data';
import {ServiceEventService} from '../services/service-event.service';
import {FooterComponent} from "../footer/footer.component";
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  DecoupledEditor,
  type EditorConfig,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageInsertViaUrl,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Mention,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventDataComponent, FooterComponent, RouterModule, FormsModule, CKEditorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./header.css', './card.css', './add-event.css', './ckField.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  eventDataList: Eventdata[] = [];
  filteredDataList: Eventdata[] = [];
  eventService: ServiceEventService = inject(ServiceEventService);
  isAddEventVisible: boolean = false;
  event: Eventdata = { // Object to store the event data
    name: '',
    photo: '',
    startDate: new Date(),
    startTime: '',
    city: '',
    country: '',
    description: '',
    organizer: '',
    price: 0
  };
  public isLayoutReady = false;
  public Editor = DecoupledEditor;
  public config: EditorConfig = {};
  @ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorMenuBarElement') private editorMenuBar!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private changeDetector: ChangeDetectorRef) {
    this.eventDataList = this.eventService.getAllEvents();
    this.filteredDataList = this.eventDataList;
  }

  onFileSelected(photo: any) { // Function for image upload
    const file: File = photo.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.event.photo = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  logOut() { // Function to log out - need for AuthService implementation
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  openAdd() { // Function to open the add event section
    this.isAddEventVisible = true;
    const addEventSection = document.querySelector('.add-event-section') as HTMLElement;
    if (addEventSection) {
      addEventSection.style.marginBottom = '0';
    }
    addEventSection.style.display = 'none';
  }

  closeAdd() { // Function to close the add event section
    this.isAddEventVisible = false;
    const addEventSection = document.querySelector('.add-event-section') as HTMLElement;
    if (addEventSection) {
      addEventSection.style.marginBottom = '';
    }
    addEventSection.style.display = 'flex';
  }

  filterResults(text: string, city: string) { // Function to filter the events based on the search query
    const results = document.querySelector('.results') as HTMLElement | null;
    const divAdder = document.querySelector('.add-event-section') as HTMLElement | null;
    const customAlert = document.createElement('div');
    const existingAlert = document.querySelector('.custom-alert') as HTMLElement | null;
    const footer = document.querySelector('.footer') as HTMLElement | null;
    if (text && !city) {
      this.filteredDataList = this.eventDataList.filter((eventData) =>
        eventData?.name.toLowerCase().includes(text.toLowerCase())
      );
    } else if (!text && city) {
      this.filteredDataList = this.eventDataList.filter((eventData) =>
        eventData?.city.toLowerCase().includes(city.toLowerCase())
      );
    } else if (text && city) {
      this.filteredDataList = this.eventDataList.filter((eventData) =>
        eventData?.name.toLowerCase().includes(text.toLowerCase()) &&
        eventData?.city.toLowerCase().includes(city.toLowerCase())
      );
    } else {
      this.filteredDataList = this.eventDataList;
    }

    if (this.filteredDataList.length === 0) {
      if (results) results.style.display = 'none';
      if (divAdder && !(text && city)) divAdder.style.marginBottom = '15rem';
      if (footer) footer.style.display = 'none';

      if (!existingAlert) {
        customAlert.className = 'custom-alert';
        customAlert.innerText = 'No events found';
        customAlert.style.position = 'fixed';
        customAlert.style.top = '60%';
        customAlert.style.left = '51%';
        customAlert.style.transform = 'translate(-50%, -50%)';
        customAlert.style.backgroundColor = '#fff';
        customAlert.style.padding = '40px';
        customAlert.style.zIndex = '1000';
        customAlert.style.fontSize = '30px';
        customAlert.style.color = '#0042B6';
        customAlert.style.fontWeight = 'bold';
        customAlert.style.width = '300px'
        customAlert.style.textAlign = 'center';
        document.body.appendChild(customAlert);
      } else {
        existingAlert.style.display = 'block';
      }
    } else {
      if (footer) footer.style.display = 'block';
      if (existingAlert) existingAlert.style.display = 'none';
      if (results) {
        if (divAdder) divAdder.style.marginBottom = '0';
        results.style.display = 'grid';
        results.style.paddingBottom = '3rem';

        // Add responsiveness for all screen sizes
        const updateGridStyles = () => {
          if (window.innerWidth <= 550) {
            customAlert.style.top = "70%";
          } else {
            customAlert.style.top = "60%";
          }

          if (window.innerWidth <= 349) {
            results.style.gridTemplateColumns = '1fr';
          } else if (window.innerWidth <= 799) {
            results.style.gridTemplateColumns = 'repeat(1, 1fr)';
            results.style.padding = window.innerWidth >= 700 ? '0 6rem' : '1rem';
          } else if (window.innerWidth <= 1249) {
            results.style.gridTemplateColumns = 'repeat(2, 1fr)';
            results.style.padding = '0 4rem';
            results.style.columnGap = '20px';
          } else if (window.innerWidth <= 1500) {
            results.style.gridTemplateColumns = 'repeat(3, 1fr)';
            results.style.padding = '0 4rem';
            results.style.columnGap = '20px';
            results.style.rowGap = '20px';
          } else if (window.innerWidth <= 1920) {
            results.style.gridTemplateColumns = 'repeat(4, 1fr)';
            results.style.padding = '0 3rem';
            results.style.columnGap = '20px';
            results.style.rowGap = '30px';
          } else {
            results.style.gridTemplateColumns = 'repeat(5, 1fr)';
            results.style.padding = '2rem 5rem';
            results.style.columnGap = '30px';
            results.style.rowGap = '40px';
          }
          results.style.paddingBottom = '3rem';
        };

        updateGridStyles();

        window.addEventListener('resize', updateGridStyles);
      }
    }
  }

  addEvent() { // Function to add an event - does not work now
  }

  public ngAfterViewInit(): void { // Function to initialize the CKEditor
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'insertTable',
          'blockQuote',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent'
        ],
        shouldNotGroupWhenFull: true
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        CloudServices,
        Code,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        HorizontalLine,
        ImageBlock,
        ImageInsertViaUrl,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        ListProperties,
        Mention,
        Paragraph,
        PasteFromOffice,
        RemoveFormat,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo
      ],
      balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
      fontFamily: {
        supportAllValues: true
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph'
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1'
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2'
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3'
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4'
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5'
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6'
          }
        ]
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true
          }
        ]
      },
      image: {
        toolbar: ['imageTextAlternative']
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      mention: {
        feeds: [
          {
            marker: '@',
            feed: [
              /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
            ]
          }
        ]
      },
      menuBar: {
        isVisible: true
      },
      placeholder: 'Add description here...',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
      }
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  public onReady(editor: DecoupledEditor): void {
    Array.from(this.editorToolbar.nativeElement.children).forEach(child => child.remove());
    Array.from(this.editorMenuBar.nativeElement.children).forEach(child => child.remove());

    this.editorToolbar.nativeElement.appendChild(editor.ui.view.toolbar.element!);
    this.editorMenuBar.nativeElement.appendChild(editor.ui.view.menuBarView.element!);
  }

}
