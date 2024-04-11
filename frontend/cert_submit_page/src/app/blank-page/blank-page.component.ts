import { Component } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { ApiService } from '../api.service';



(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css']
})


export class BlankPageComponent {
 
  constructor(private apiService: ApiService) {}

  item: any;
  itemId: String;
  dropDownOptions: any[] = [
    { id: "cert1", name: 'Option 1' },
    { id: "cert2", name: 'Option 2' },
    { id: "cert3", name: 'Option 3' }
  ];

  
  generatePDF()
  {
    //https://stackoverflow.com/questions/55019343/how-to-generate-a-pdf-using-angular-7 basically helped me with this with few adjustments.
      let data = <HTMLElement>document.getElementById('exportform');  
      html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      //let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Cert_Submission.pdf');   
    }); 
  }

  getItemById() {
    if(this.itemId){
      this.apiService.getItems().subscribe((response) => {
        this.item = response;
        console.log(this.item);
      });
    }
  }


}

