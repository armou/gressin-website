import { Component, OnInit } from '@angular/core';
import { SkribblService } from '../skribbl.service'
import { FileService } from '../../common/file.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-skribbl-word-list',
  templateUrl: './skribbl-word-list.component.html',
  styleUrls: ['./skribbl-word-list.component.scss']
})
export class SkribblWordListComponent implements OnInit {

  constructor(private skribblService: SkribblService,
              private fileService: FileService) { }

  wordCount: number;

  ngOnInit() {
    this.getWordCount();
  }

  newWordForm = new FormGroup({
    newWord: new FormControl('', [Validators.required, Validators.maxLength(30)])
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

    this.skribblService.addWord(this.newWordForm.getRawValue().newWord).subscribe(data => {
      console.log(data);
    });
    this.getWordCount();
  }

  getWord() {
    this.skribblService.getWord().subscribe(data => {
      this.copyToClipboard(data);
    })
  }

  download() {
    console.log('try to download...');
    this.fileService.downloadFile().subscribe(response => {
			//let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
			//const url= window.URL.createObjectURL(blob);
			//window.open(url);
			window.location.href = response.url;
			//fileSaver.saveAs(blob, 'employees.json');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  // login(): void {
  //   this.authService.login(this.email, this.password)
  //   .subscribe(data => {
  //     this.router.navigate(['']);
  //   })
  // }
}
