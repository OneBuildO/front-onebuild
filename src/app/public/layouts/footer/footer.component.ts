import { Component } from '@angular/core';
import { DatetimeHelper } from 'src/app/_core/helpers/datetime.helper';
import { Images } from 'src/assets/data/images';
import { environment } from "src/environments/environment";

@Component({
  selector: 'public-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class PublicFooterComponent {
  public readonly currentYear: number = DatetimeHelper.currentYear;
  public mainLogo: string = Images.mainLogo;
  readonly currentVersion = environment.version
}
