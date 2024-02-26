import React from 'react'
import '../../pages/contact/index'
import styles from '../../styles/Buttons/Buttons.module.css'
import Link from 'next/link'
export default function Getstart() {
  return (
    <div>
      
     <Link href='/view' className={'btn  my-4 fa-x ' + `${styles.getbtn}`}>Get Start</Link>

    </div>
  )
}
