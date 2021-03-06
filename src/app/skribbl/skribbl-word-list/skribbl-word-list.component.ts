import { Component, OnInit } from '@angular/core';
import { SkribblService } from '../skribbl.service'
import { FileService } from '../../common/file.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-skribbl-word-list',
  templateUrl: './skribbl-word-list.component.html',
  styleUrls: ['./skribbl-word-list.component.scss']
})
export class SkribblWordListComponent implements OnInit {

  constructor(private skribblService: SkribblService,
              private fileService: FileService) { }

  wordCount: number;
  gifURL: any;

  ngOnInit() {
    this.getWordCount();
    this.getGif();
  }

  get newWord() { return this.newWordForm.get('newWord'); }

  forbiddenNameValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('newWord');
    return password && control.value && control.value.toLowerCase().trim() === 'armel' ? {
      forbiddenName: true
    }: null;
  }

  trimmingWordValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('newWord');
    return control.value && control.value.length > 1 && control.value.trim().length < 1 ? {
      forbiddenValue: true
    }: null;
  }

  newWordForm = new FormGroup({
    newWord: new FormControl('', [Validators.required, Validators.maxLength(30), this.forbiddenNameValidator, this.trimmingWordValidator])
  })

  getWordCount() {
    this.skribblService.getWord().subscribe(data => {
      if (typeof(data) === 'string') {
        let string = data;
        this.wordCount = string.split(',').length;
      }
    })
  }

  copyToClipboard(text: any) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

  addWord() {

    if(!this.newWordForm.valid) return;
    console.log(this.newWordForm.getRawValue().newWord.toLowerCase());

    this.skribblService.addWord(this.newWordForm.getRawValue().newWord.trim()).subscribe(data => {
      // console.log(data);
      // console.log('request finished')
    }, error => {
      console.log('allo maman ?')
      console.log(error);
    });
    this.getWordCount();
    this.getGif();
    this.newWordForm.reset();
  }

  getGif() {
    this.skribblService.getGif().subscribe(data => {
        this.gifURL = data;
    });
  }

  getWord() {
    this.skribblService.getWord().subscribe(data => {
      this.copyToClipboard(data);
    })
  }

  download() {
    this.skribblService.getWord().subscribe(data => {
      var string: string|any;
      string = data;
      var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "skribbl-gressin-word-list.txt")
    })
  }


  wordToDelete: string;

  deleteWord() {
    this.skribblService.deleteWord(this.wordToDelete);
    this.getWordCount();
    this.wordToDelete = '';
  }
}
