import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { IColumn, IProjects, TableData } from './table.data';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgClass, DataTableComponent],
  templateUrl: './data-table.component.html',
})
export class AdminDataTableComponent {
  public products: IProjects[] = TableData.projects;
  public pages: number[] = TableData.pageNumber;
  public columnData:IColumn[] = TableData.columnData
}
