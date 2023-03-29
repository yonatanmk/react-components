import type { IPerson, ITableColumn, ISong } from '../../interfaces'
import LinkCell from '../LinkCell'
import CheckmarkCell from '../CheckmarkCell'

const booleanSortFunctionGenerator = (field: string) => (row: any) =>{ // FIX TS
  if (row?.[field]?.props?.affirmative === true) return 1;
  if (row?.[field]?.props?.affirmative === false) return 2;
  return 3
}

export const peopleRows: IPerson[] = [
  {
    "id": 12341643624,
    "name": "Patrick Watts",
    "phone": "1-920-517-1265",
    "email": "laoreet.ipsum@google.couk",
    "address": "Ap #872-1390 Nascetur Ave",
    "postalZip": 558566,
    "country": "Vietnam",
    "link": {
      "props": {
        "text": "Facebook",
        "url": "https://www.facebook.com/",
      }
    },
    "accepted": {
      "props": {
        "affirmative": true,
      }
    },
  },
  {
    "id": 123567653824,
    "name": "Jack Barrera",
    "phone": "1-806-473-9143",
    "email": "lectus.rutrum@hotmail.com",
    "address": "P.O. Box 291, 8088 Aenean Road",
    "postalZip": 23704,
    "country": "China",
    "accepted": {
      "props": {
        "affirmative": false,
      }
    },
  },
  {
    "id": 122536343564124,
    "name": "Jared Horne",
    "phone": "1-383-432-5382",
    "email": "non@protonmail.ca",
    "address": "5541 Diam Ave",
    "postalZip": 11365,
    "country": "South Korea",
    "link": {
      "props": {
        "text": "Google Maps",
        "url": "https://www.google.com/maps",
      },
    },
  },
  {
    "id": 1234133562424,
    "name": "Xander Harding",
    "phone": "1-336-397-4318",
    "email": "aliquet.diam@aol.edu",
    "address": "398-9679 Sollicitudin St.",
    "postalZip": "8788 YA",
    "country": "Canada",
    "accepted": {
      "props": {
        "affirmative": true,
      },
    },
  },
  {
    "id": 12324163224,
    "name": "Cara Neal",
    "phone": "1-713-326-0414",
    "email": "morbi@protonmail.edu",
    "address": "6266 Morbi Avenue",
    "postalZip": 631226,
    "country": "Netherlands",
    "link": {
      "props": {
        "text": "Google",
        "url": "https://www.google.com",
      },
    },
    "accepted": {
      "props": {
        "affirmative": false,
      },
    },
  },
  {
    "id": 123567624,
    "name": "Bobby",
    "phone": "1-806-473-9143",
    "email": "lectus.rutrum@hotmail.com",
    "address": "P.O. Box 291, 8088 Aenean Road",
    "postalZip": 23704,
    "country": "China",
  },
];

export const peopleColumns: ITableColumn<IPerson>[] = [
  {
    name: 'Country',
    index: 6,
    field: 'country',
  },
  {
    name: 'Email',
    index: 3,
    field: 'email',
  },
  {
    name: 'Address',
    index: 4,
    field: 'address',
  },
  {
    name: 'Phone',
    index: 2,
    field: 'phone',
  },
  {
    name: 'Zip Code',
    index: 5,
    field: 'postalZip',
  },
  {
    name: 'Name',
    index: 1,
    field: 'name',
  },
  {
    name: 'Link',
    index: 7,
    field: 'link',
    component: LinkCell,
    sortByFunction: row => row?.link?.props?.text
  },
  {
    name: 'Accepted',
    index: 8,
    field: 'accepted',
    // sortFunction
    // filters
    // renderComponent: true,
    component: CheckmarkCell,
    // sortByFunction: row => {
    //   if (row?.accepted?.props?.accepted === true) return 1;
    //   if (row?.accepted?.props?.accepted === false) return 2;
    //   return 3
    // },
    sortByFunction: booleanSortFunctionGenerator('accepted')
  },
];

export const songRows: ISong[] = [
  {
    _id: 223434,
    name: 'Bright Whites',
    artist: 'Kishi Bashi',
    album: '151a',
    duration: 253000,
    liked: {
      props: {
        affirmative: true,
      },
    },
  },
  {
    _id: 223435,
    name: 'Go Do',
    artist: 'Jonsi',
    album: 'Jonsi - Go',
    duration: 280000,
  },
  {
    _id: 223436,
    name: 'Genghis Khan',
    artist: 'Miike Snow',
    duration: 210000,
  },
  {
    _id: 223437,
    name: 'Boy Lilikoi',
    artist: 'Jonsi',
    album: 'Jonsi - Go',
    duration: 270000,
    liked: {
      props: {
        affirmative: false,
      },
    },
  },
  {
    _id: 223438,
    name: 'Fluorescent Adolescent',
    artist: 'Arctic Monkeys',
    album: 'Favourite Worst Nightmare',
    duration: 178000,
  },
];

export const songColumns: ITableColumn<ISong>[] = [
  {
    name: 'Artist',
    index: 2,
    field: 'artist',
  },
  {
    name: 'Duration',
    index: 4,
    field: 'duration',
    formatFunction: (row: ISong): string => {
      const duration = row.duration;
      const minutes = Math.floor(duration / 60000);
      const seconds = ((duration % 60000) / 1000)
      const roundedSeconds = seconds.toFixed(0);
      return minutes + ":" + (seconds < 9.5 ? '0' : '') + roundedSeconds;
    }
  },
  {
    name: 'Name',
    index: 1,
    field: 'name',
  },
  {
    name: 'Album',
    index: 3,
    field: 'album',
  },
  {
    name: 'Liked',
    index: 5,
    field: 'liked',
    component: CheckmarkCell,
    sortByFunction: booleanSortFunctionGenerator('liked'),
  },
];