import React from 'react'
import { useAccount } from 'wagmi'
import { useIsMounted } from '../../pages/hooks/useIsMounted'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from '../../styles/Navigation/Navigation.module.css'
import Link from 'next/link'
export default function Navigation() {
  const mounted = useIsMounted();
  const { connector: isConnected } = useAccount()

  return (



    <nav className={'navbar navbar-expand-lg bg-body-tertiary position-fixed  w-100 ' + `${styles.navindex}`} >
      <div className={'container mx-5 '}>


        <div className="d-flex  w-100">

          <Link className="navbar-brand" href="/"> LOGO </Link>



          <button className={' navbar-toggler ' + `${styles.toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} size='lg' fixedWidth className={styles.navbarTogglerIcon + ' text-dark '} />
          </button>



          <div className={' w-100  '}>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {mounted? isConnected &&
                  <li className="nav-item">
                    <Link className={'nav-link active text-capitalize ' + `${styles.navbtn}`} aria-current="page" href="/vaults">the vaults</Link>
                  </li> : null
                }
                <li className="nav-item">
                  <Link className={'nav-link active text-capitalize ' + `${styles.navbtn}`} aria-current="page" href="/docs">Docs</Link>
                </li>
                <li className="nav-item">
                  <Link className={'nav-link active text-capitalize ' + `${styles.navbtn}`} aria-current="page" href="/view">How it works</Link>
                </li>
                <li className="nav-item">
                  <Link className={'nav-link active text-capitalize ' + `${styles.navbtn}`} aria-current="page" href="/contact">resources</Link>
                </li>


              </ul>
              <ConnectButton></ConnectButton>
            </div>
          </div>
        </div>
      </div>

    </nav>

  )
}
