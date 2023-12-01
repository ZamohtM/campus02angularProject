import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGX_COMBO_DIRECTIVES} from "igniteui-angular";
import {Book} from "../../../interfaces/book";

@Component({
  selector: 'book-Lending-Combo',
  styleUrls: ['./book-lending-combo.component.css'],
  templateUrl: './book-lending-combo.component.html',
})

export class BookLendingComboComponent implements OnInit {


  @Input() bookConditionData: { name: string, id: string }[] = [];
  @Input() selectedConditionId: string = '';
  @Output() conditionChange = new EventEmitter<string>();
  @Output() bookCondition: string = "";
  public ngOnInit() {
    this.bookConditionData = [
      {name: 'Buch neuwertig', id: '0'},
      {name: 'Buch abgegriffen', id: '1'},
      {name: 'Buch starke Abnutzungen', id: '2'},
      {name: 'Buch Abnutzgrad unbekannt', id: ''},
    ];
  }
  onConditionChange() {
    this.conditionChange.emit(this.selectedConditionId);
  }

  updateSelectedConditionById(conditionId: string) {
    this.selectedConditionId = conditionId;
    this.conditionChange.emit(this.selectedConditionId);
  }
}
