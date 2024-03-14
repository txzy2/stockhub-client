import {ProductReciveDto} from '../types/types';

export const Products: ProductReciveDto[] = [
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand 1',
    material: 'Material 1',
    color: 'Color 1',
    size: [
      {
        id: 1,
        size: '9 us',
      },
      {
        id: 2,
        size: '12 us',
      },
    ],
    photo: 'Photo 1',
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand 2',
    material: 'Material 2',
    color: 'Color 2',
    size: [
      {
        id: 1,
        size: '9 us',
      },
      {
        id: 2,
        size: '10 us',
      },
    ],
    photo: 'Photo 2',
  },
  {
    id: 3,
    name: 'Product 3',
    brand: 'Brand 3',
    material: 'Material 3',
    color: 'Color 3',
    size: [
      {
        id: 1,
        size: '10 us',
      },
      {
        id: 2,
        size: '11 us',
      },
    ],
    photo: 'Photo 3',
  },
];
