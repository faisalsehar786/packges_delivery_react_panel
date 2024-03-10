import { FC, useEffect } from 'react'
import { useContext } from 'react'
import MasterlayoutContext from '../../../../context/Masterlayout/layoutContext'
import $ from 'jquery'
import { AsideMenuMain2 } from './AsideMenuMain'

const AsideSecondary: FC = () => {
  const masterlayoutContextRecive = useContext(MasterlayoutContext)
  const { HasparentState, subMenuRecive, titleSubmenu } = masterlayoutContextRecive

  useEffect(() => {
    if (HasparentState) {
      let bodyObjcet = $('body')

      bodyObjcet.find('.menue-drawrCustom').show()

      bodyObjcet.find('.header').css({ left: '315px' })

      bodyObjcet.find('.content').css({ 'margin-left': '245px' })
      $('.fsatollenav').attr('style', 'display: block !important')
    } else {
      let bodyObjcet = $('body')

      bodyObjcet.find('.menue-drawrCustom').hide()
      bodyObjcet.find('.header').css({ left: '65px' })
      bodyObjcet.find('.content').css({ 'margin-left': '0px' })
    }
  })

  return (
    <div className='menue-drawrCustom'>
      <div
        className=' menu-title-gray-600 menu-state-primary 
            menu-state-icon-primary menu-state-bullet-primary
             menu-arrow-gray-500 fw-bold fs-6'
      >
        <h3 className='p-0 titleSubmenu mt-7 mb-6 text-dark  fs-8 ls-1'>
          {'Støtte' || titleSubmenu}
        </h3>
        <hr className='cfhsline' />
        <div className='customchfsScrollaside'>
          <AsideMenuMain2 Mnename={subMenuRecive} hasparent={HasparentState} />
        </div>
      </div>
    </div>
  )
}

export { AsideSecondary }
