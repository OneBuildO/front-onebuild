import {DatePipe} from "@angular/common";

export function formatDatePTBR(dataString: string | undefined) : string | null {
  const datepipe: DatePipe = new DatePipe('pt-BR')
  if(dataString) return datepipe.transform(dataString, 'dd/MM/YYYY');
  else return null;
}

export function onRedrectForWhatsApp(text: string | undefined): void {
  if(text) window.open(`https://wa.me/55${text}`, '_blank');
}

export function redirectProjectoClient(id : number | null | undefined){
  window.location.href = (`/admin/projetos/?cliente=${id}`)
}
