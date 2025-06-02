export const roomSlides = {
    'Ruang A3': [
      {
        image: new URL('../assets/rooms/A3/1.jpg', import.meta.url).href,
        instruction: 'Lurus ke arah pintu lobby Fakultas Ilmu terapan',
        distance: '',
        direction: 'lurus',
      },
      {
        image: new URL('../assets/rooms/A3/2.jpg', import.meta.url).href,
        instruction: 'Gunakan ramp pada sisi kiri tangga',
        distance: '',
        direction: 'spot',
      },
      {
        image: new URL('../assets/rooms/A3/3.jpg', import.meta.url).href,
        instruction: 'Masuk ke dalam lobby FIT',
        distance: '',
        direction: 'spot',
      },
      {
        image: new URL('../assets/rooms/A3/4.jpg', import.meta.url).href,
        instruction: 'Belok kiri ke arah lift',
        distance: '3 meter',
        direction: 'kiri',
      },
      {
        image: new URL('../assets/rooms/A3/5.jpg', import.meta.url).href,
        instruction: 'Lurus ke arah lift',
        distance: '1 meter',
        direction: 'lurus',
      },
      {
        image: new URL('../assets/rooms/A3/6.jpg', import.meta.url).href,
        instruction: 'Lurus ke arah lift',
        distance: '',
        direction: 'lurus',
      },
      {
        image: new URL('../assets/rooms/A3/7.jpg', import.meta.url).href,
        instruction: 'Lurus ke arah lift',
        distance: '',
        direction: 'lurus',
      },
      {
        image: new URL('../assets/rooms/A3/8.jpg', import.meta.url).href,
        instruction: 'Naik menuju lantai 2',
        distance: '',
        direction: 'naik',
      },
      {
        image: new URL('../assets/rooms/A3/9.jpg', import.meta.url).href,
        instruction: 'Belok kanan menuju koridor',
        distance: '1 meter',
        direction: 'kanan',
      },
      {
        image: new URL('../assets/rooms/A3/10.jpg', import.meta.url).href,
        instruction: 'lurus menuju koridor',
        distance: '1 meter',
        direction: 'lurus',
      },
      {
        image: new URL('../assets/rooms/A3/11.jpg', import.meta.url).href,
        instruction: 'Lurus menuju pintu 2',
        distance: '1 meter',
        direction: 'lurus',
      },
      {
        image: new URL('../assets/rooms/A3/12.jpg', import.meta.url).href,
        instruction: 'Anda telah sampai di lokasi tujuan',
        distance: '',
        direction: 'spot',
      },
    ],
    //new room slot
  };

  
export const directionIcons = {
    lurus: 'arrow_upward',
    kanan: 'turn_right',
    kiri: 'turn_left',
    spot: 'location_on',
    naik: 'arrow_upward',
    turun: 'arrow_downward',
    ramp: 'accessible_forward',
  };