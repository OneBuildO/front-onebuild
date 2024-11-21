import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes, ElementRoutes, SettingRoutes } from './admin.routes';
import { AdminPageNotFoundComponent } from './views/admin-page-not-found/admin-page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AdminAlertComponent } from './views/elements/alert/admin-alert.component';
import { ButtonsComponent } from './views/elements/buttons/buttons.component';
import { AdminDataTableComponent } from './views/elements/data-table/data-table.component';
import { FormsComponent } from './views/elements/forms/forms.component';
import { AdminModalComponent } from './views/elements/modal/admin-modal.component';
import { AdminTabComponent } from './views/elements/tab/admin-tab.component';
import { EventsComponent } from './views/events/events.component';
import { TestComponent } from './views/events/test/test.component';
import { ProfileComponent } from './views/settings/profile/profile.component';
import { UsersComponent } from './views/settings/users/users.component';
import {ProjetosComponent} from "./views/projetos/projetos.component";
import {FornecedoresComponent} from "./views/fornecedores/fornecedores.component";
import {ClientesComponent} from "./views/clientes/clientes.component";
import {ProjetoDetailComponent} from "./views/projetos/projetoDetail/projetoDetail.component";
import {OportunidadesComponent} from "./views/oportunidades/oportunidades.component";
import {MinhasOfertasComponent} from "./views/minhas-ofertas/minhas-ofertas.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: AdminRoutes.Dashboard,
    pathMatch: 'full',
  },
  {
    title: 'Dashboard',
    path: AdminRoutes.Dashboard,
    component: DashboardComponent,
  },
  {
    title: 'Projetos',
    path: AdminRoutes.Projetos,
    component: ProjetosComponent,
  },
  {
    title: 'Detalhamento',
    path: `${AdminRoutes.Projetos}/detalhes`,
    component: ProjetoDetailComponent,
  },
  {
    title: 'Fornecedores',
    path: AdminRoutes.Fornecedores,
    component: FornecedoresComponent,
  },
  {
    title: 'Oportunidades',
    path: AdminRoutes.Oportunidades,
    component: OportunidadesComponent,
  },
  {
    title: 'Clientes',
    path: AdminRoutes.Clientes,
    component: ClientesComponent,
  },
  {
    title: 'Minhas ofertas',
    path: AdminRoutes.MinhasOfertas,
    component: MinhasOfertasComponent,
  },
  {
    title: 'Events',
    path: AdminRoutes.Events,
    component: EventsComponent,
    children: [
      {
        path: 'testing',
        component: TestComponent,
        outlet: 'test',
      },
    ],
  },
  {
    title: 'Elements',
    path: AdminRoutes.Elements,
    children: [
      {
        title: 'Alert',
        path: ElementRoutes.Alert,
        component: AdminAlertComponent,
      },
      {
        path: 'tabs',
        component: AdminTabComponent,
      },
      {
        title: 'Modal',
        path: ElementRoutes.Modal,
        component: AdminModalComponent,
      },
      {
        title: 'Buttons',
        path: ElementRoutes.Buttons,
        component: ButtonsComponent,
      },
      {
        title: 'Data Table',
        path: ElementRoutes.DataTable,
        component: AdminDataTableComponent,
      },
      {
        title: 'Forms',
        path: ElementRoutes.Forms,
        component: FormsComponent,
      },
    ],
  },
  {
    path: AdminRoutes.Settings,
    children: [
      {
        title: 'Settings',
        path: SettingRoutes.Profile,
        component: ProfileComponent,
      },
      {
        title: 'Users',
        path: SettingRoutes.Users,
        component: UsersComponent,
      },
    ],
  },
  { path: '**', component: AdminPageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
