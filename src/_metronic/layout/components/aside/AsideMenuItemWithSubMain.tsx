import { FC } from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { checkIsActive } from '../../../helpers'
import { useLayout } from '../../core'
import { useContext } from 'react'
import MasterlayoutContext from '../../../../context/Masterlayout/layoutContext'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  bsTitle?: string
  menuitemwithSub?: boolean
}

const AsideMenuItemWithSubMain: FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  bsTitle,
}) => {
  const masterlayoutContextRecive = useContext(MasterlayoutContext)
  const { subMenueClickReciver } = masterlayoutContextRecive

  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return (
    <>
      <div
        className={clsx('menu-item py-1', { 'here show': isActive })}
        data-kt-menu-trigger='click'
        data-kt-menu-placement='right-start'
        onClick={() =>
          subMenueClickReciver(children, to, title, icon, fontIcon, hasBullet, bsTitle)
        }
      >
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id='button-tooltip' {...props}>
              {bsTitle}
            </Tooltip>
          )}
        >
          <span className='menu-link menu-center'>
            {fontIcon && aside.menuIcon === 'font' && (
              <span className='menu-icon me-0'>
                <i className={clsx('bi', fontIcon, 'fs-2')}></i>
              </span>
            )}
          </span>
        </OverlayTrigger>
        {/* <div
        className={clsx('menu-sub menu-sub-dropdown w-225px w-lg-275px px-1 py-4', {
          'menu-active-bg': isActive,
        })}
      >
        {children}
      </div> */}
      </div>
    </>
  )
}

export { AsideMenuItemWithSubMain }
