import Swal from 'sweetalert2';

import 'animate.css'

export default function Alert(a, b,c, d, e) {
  Swal.fire({
    title: `${a}`,
    text: `${e}`,
    icon: `${b}`,
    showClass: {
      popup: `animate__animated ${c}`
    },
    hideClass: {
      popup: `animate__animated ${d}`
    },
  })
}