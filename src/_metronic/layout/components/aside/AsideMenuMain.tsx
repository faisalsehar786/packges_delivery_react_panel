/* eslint-disable react/jsx-no-target-blank */
// import {useIntl} from 'react-intl'
// import { AsideMenuItemWithSubMain } from './AsideMenuItemWithSubMain'
import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

function AsideMenuMain(props: any) {
  // const intl = useIntl()
  return (
    <>
      <div>
        <AsideMenuItem
          to='home/oversikt'
          title=''
          fontIcon='fa-rocket-launch fa-duotone fs-2'
          // bsTitle={`Support`}
          hasparent={false}
          showaside={true}
          displayMenuCondition='home'
          main='home'
        />
      </div>
    </>
  )
}

function AsideMenuMain2(props: any) {
  return (
    <>
      {props.hasparent && props.Mnename === 'user-mangement' && (
        <>
          <AsideMenuItemWithSub
            to='user-mangement/user-overview'
            // title='USERS'
            hasBullet={false}
          >
            <AsideMenuItem
              to='user-mangement/user-overview'
              title='System brukere'
              bsTitle='System brukere'
              fontIcon='fa-duotone fa-users-gear'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='user-mangement'
            />

            <AsideMenuItem
              to='user-mangement/add-new-user'
              title='Opprett ny bruker'
              bsTitle='Opprett ny bruker'
              fontIcon='fa-duotone fa-user-ninja'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='user-mangement'
            />
          </AsideMenuItemWithSub>
        </>
      )}

      {props.hasparent && props.Mnename === 'settings' && (
        <>
          <AsideMenuItemWithSub
            to='settings/golbal-settings'
            title='GLOBAL Settings'
            hasBullet={false}
          >
            <AsideMenuItem
              to='settings/golbal-settings'
              title='Overview'
              bsTitle='Overview'
              hasBullet={false}
              fontIcon='bi bi-grid-3x3-gap-fill'
              hasparent={true}
              displayMenuCondition='settings'
            />

            <AsideMenuItem
              to='settings/system-status'
              title='System Status'
              bsTitle='System Status'
              fontIcon='bi bi-key-fill'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='settings'
            />

            <AsideMenuItem
              to='settings/security-events'
              title='Security Events'
              bsTitle='Security Events'
              fontIcon='bi bi-shield-shaded'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='settings'
            />
          </AsideMenuItemWithSub>

          <AsideMenuItemWithSub
            to='settings/notification-center'
            title='NOTIFICATION CENTER'
            hasBullet={false}
          >
            <AsideMenuItem
              to='settings/notification-center'
              title='Overview'
              bsTitle='Overview'
              fontIcon='bi bi-eye-fill'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='settings'
            />

            <AsideMenuItem
              to='settings/notification-settings'
              title='Notification Settings'
              bsTitle='Notification Settings'
              fontIcon='bi bi bi-bell-fill'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='settings'
            />
          </AsideMenuItemWithSub>
        </>
      )}

      {props.hasparent && (props.Mnename === 'support' || props.Mnename === 'home') && (
        <>
          <AsideMenuItemWithSub to='home/oversikt' hasBullet={false}>
            <AsideMenuItem
              to='home/oversikt'
              title='Oversikt'
              bsTitle='Oversikt'
              hasBullet={false}
              fontIcon='fa-duotone fa-chart-simple'
              hasparent={true}
              displayMenuCondition='support'
            />

            <AsideMenuItem
              to='home/published_jobs'
              title='Publiserte jobber'
              bsTitle='Publiserte jobber'
              fontIcon='fa-duotone fa-bullseye-pointer'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='support'
            />

            <AsideMenuItem
              to='home/activedeliveries'
              title='Aktive leveringer'
              bsTitle='Aktive leveringer'
              fontIcon='fa-duotone fa-sitemap'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='support'
            />

            <AsideMenuItem
              to='home/app-users'
              title='Sluttbrukere'
              bsTitle='Sluttbrukere'
              fontIcon='fa-duotone fa-user'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='support'
            />

            <div className='menu-item'>
              <a
                className='menu-link menu-center haveparent'
                data-bs-toggle='tooltip'
                data-bs-trigger='hover'
                data-bs-dismiss='click'
                data-bs-placement='right'
                data-bs-original-title='Customer'
                href=''
                id='kt_pushnotification_toggle'
              >
                <span className='menu-icon'>
                  <i className='fa-solid fa-bell' />
                </span>
                <span className='menu-title'>Push varsler</span>
              </a>
            </div>
          </AsideMenuItemWithSub>
        </>
      )}

      {props.hasparent && props.Mnename === 'external' && (
        <>
          <AsideMenuItemWithSub to='external/zendesk' title='Zendesk' hasBullet={false}>
            <AsideMenuItem
              to='external/zendesk'
              title='Zendesk'
              bsTitle='Zendesk'
              hasBullet={false}
              fontIcon='bi bi-bar-chart-fill'
              hasparent={true}
              displayMenuCondition='support'
            />

            <AsideMenuItem
              to='external/communication'
              title='Org. tickets'
              bsTitle='Org. tickets'
              fontIcon='bi bi-brush-fill'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='support'
            />

            <AsideMenuItem
              to='external/contact'
              title='Customer service'
              bsTitle='Customer service'
              fontIcon='bi bi-key-fill'
              hasBullet={false}
              hasparent={true}
              displayMenuCondition='support'
            />
          </AsideMenuItemWithSub>
        </>
      )}
    </>
  )
}
export { AsideMenuMain, AsideMenuMain2 }
