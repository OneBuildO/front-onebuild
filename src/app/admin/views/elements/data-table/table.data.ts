export interface IProjects {
  id: number;
  nome: string;
  cliente: string;
  dataLimiteOrcamento: string;
  arquivo: string;
}

export interface IColumn {
  field: string;
  headerName: string;
  width?: number;
  isEditable?: boolean;
  isSortable?: boolean;
  type?: string | number | boolean ;
}

export class TableData {
  public static readonly projects: IProjects[] = [
    {
      id: 1,
      nome: 'Cobertura casa de praia',
      cliente: 'Robson Charles',
      dataLimiteOrcamento: '10/06/2024',
      arquivo: '...',
    },
    {
      id: 2,
      nome: 'Apartamento nova iguaçu',
      cliente: 'Bianca Souza',
      dataLimiteOrcamento: '30/05/2024',
      arquivo: '...',
    },
    {
      id: 3,
      nome: 'Casa Clebson',
      cliente: 'Clebson Nogueira',
      dataLimiteOrcamento: 'Hoje',
      arquivo: '...',
    },
    {
      id: 4,
      nome: 'Casa de praia',
      cliente: '',
      dataLimiteOrcamento: '',
      arquivo: '...',
    },
    {
      id: 5,
      nome: 'Bancada sala da cozinha',
      cliente: 'Matheus Melo',
      dataLimiteOrcamento: '',
      arquivo: '',
    },
    {
      id: 6,
      nome: 'Varanda',
      cliente: 'Zélia Castro',
      dataLimiteOrcamento: '',
      arquivo: '',
    },
  ];
  public static readonly columnData: IColumn[] = [
    {
      field: 'productname',
      headerName: 'product name',
      width: 25,
      isEditable: true,
      isSortable: false,

    },
    {
      field: 'color',
      headerName: 'Color',
      width: 25,
      isEditable: true,
      isSortable: false,

    },
    {
      field: 'category',
      headerName: 'Category',
      width: 25,
      isEditable: true,
      isSortable: false,

    },
    {
      field: 'price',
      headerName: 'Price',
      width: 25,
      isEditable: true,
      isSortable: false,

    },
    {
      field: 'action',
      headerName: 'Action',
      width: 25,
      isEditable: true,
      isSortable: false,

    },
  ];

  public static readonly pageNumber: number[] = [1, 2, 3, 4, 5];
}
