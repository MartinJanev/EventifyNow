import {ChangeDetectorRef, Component, ElementRef, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventDataComponent} from '../event-data/event-data.component';
import {Eventdata} from '../../interface/event-data';
import {ServiceEventService} from '../services/service-event.service';
import {FooterComponent} from "../footer/footer.component";
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeEvent, CKEditorModule} from '@ckeditor/ckeditor5-angular';
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
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventDataComponent, FooterComponent, RouterModule, FormsModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./header.css', './card.css', './add-event.css', './ckField.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  eventsList: Eventdata[] = [];
  filteredDataList: Eventdata[] = [];
  eventService: ServiceEventService = inject(ServiceEventService);
  authService: AuthService = inject(AuthService);
  isAddEventVisible: boolean = false;

eventObj: Eventdata={
  id: '',
  name: '',
  photo: '',
  startDate: new Date(),
  startTime: '',
  city: '',
  country: '',
  description: '',
  organizer: '',
  price: 0
}
  id: string = '';
  name: string = '';
  photo: string = '';
  startDate: Date = new Date();
  startTime: string = '';
  city: string = '';
  country: string = '';
  description: string = '';
  organizer: string = '';
  price: number = 0;


  public isLayoutReady = false;
  public Editor = DecoupledEditor;
  public config: EditorConfig = {};
  @ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorMenuBarElement') private editorMenuBar!: ElementRef<HTMLDivElement>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private data: ServiceEventService
  ) {
    this.eventsList = this.eventService.getAllEvents();
    this.filteredDataList = this.eventsList;
  }

  ngOnInit() : void{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getAllTheEvents();
  }

  getAllTheEvents() {
    this.data.getEvents().subscribe(res => {

      this.eventsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data
      })
    }, err => {
      alert('Error fetching the events')
    })
  }

  resetForm() {
    this.id = '';
    this.name = '';
    this.photo = '';
    this.startDate = new Date();
    this.startTime = '';
    this.city = '';
    this.country = '';
    this.description = '';
    this.organizer = '';
    this.price = 0;
  }

  addEvent() {
    if (
      this.name == '' ||
      this.city == '' ||
      this.country == '' ||
      this.description == '' ||
      this.organizer == '' ||
      this.photo == ''
    )
    {
      alert('Please fill all the fields');
    }
  
      this.eventObj.id = '';
      this.eventObj.name = this.name;
      this.eventObj.photo = this.photo;
      this.eventObj.startDate = this.startDate;
      this.eventObj.startTime = this.startTime;
      this.eventObj.city = this.city;
      this.eventObj.country = this.country;
      this.eventObj.description = this.description;
      this.eventObj.organizer = this.organizer;
      this.eventObj.price = this.price;

      this.data.addEvent(this.eventObj);
      this.resetForm();
  }

  
  updateEvents() {

  }

  deleteEvent(event:Eventdata) { // Delete event
    if (window.confirm('Are you sure you want to delete the event '+event.name+'?')) {
      const customAlert = document.createElement('div');
      customAlert.style.opacity = '0';
      customAlert.style.transition = 'opacity 0.2s';
      document.body.appendChild(customAlert);
      requestAnimationFrame(() => {
        customAlert.style.opacity = '1';
      });
      customAlert.innerText = 'You have successfully deleted this event!';
      customAlert.style.position = 'fixed';
      customAlert.style.top = '10%';
      customAlert.style.left = '50%';
      customAlert.style.transform = 'translate(-50%, -50%)';
      customAlert.style.backgroundColor = '#fff';
      customAlert.style.padding = '40px';
      customAlert.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      customAlert.style.zIndex = '1000';
      customAlert.style.fontSize = '20px';
      customAlert.style.color = '#0042B6';
      customAlert.style.fontWeight = 'bold';
      document.body.appendChild(customAlert);

      this.data.deleteEvent(event)

      setTimeout(() => {
        document.body.removeChild(customAlert);
      }, 2500); // Customize the duration as needed
    }
  }


  public onChange({editor}: ChangeEvent) {
    const data = editor.getData();

    console.log(data);
  }

  onFileSelected(photo: any) { // Function for image upload
    const file: File = photo.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  logOut() {
    this.authService.logout();
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
      this.filteredDataList = this.eventsList.filter((eventData) =>
        eventData?.name.toLowerCase().includes(text.toLowerCase())
      );
    } else if (!text && city) {
      this.filteredDataList = this.eventsList.filter((eventData) =>
        eventData?.city.toLowerCase().includes(city.toLowerCase())
      );
    } else if (text && city) {
      this.filteredDataList = this.eventsList.filter((eventData) =>
        eventData?.name.toLowerCase().includes(text.toLowerCase()) &&
        eventData?.city.toLowerCase().includes(city.toLowerCase())
      );
    } else {
      this.filteredDataList = this.eventsList;
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

  // CKEditor functions

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
