import MasterlayoutContext from './layoutContext'
import {useState} from 'react'
import $ from 'jquery'
const MasterLayoutState = (props) => {
  ////////////////    Side Bar Secondary  Controle Function and States start here  //////////////////////////
  const [subMenuRecive, setsubMenuRecive] = useState('')
  const [titleSubmenu, setTitleSubmenu] = useState('')
  const [HasparentState, setHasparentState] = useState('')
  const [successMessageSupport, setsuccessMessageSupport] = useState('')
     
  let subMenueClickReciver = (titleberd = '', hasparent = false, displayMenuCondition = '') => {
    setHasparentState(hasparent)
    setsubMenuRecive(displayMenuCondition)
    setTitleSubmenu(titleberd)

    if (HasparentState) {
      let bodyObjcet = $('body')

      bodyObjcet.find('.menue-drawrCustom').show()

      bodyObjcet.find('.header').css({left: '315px'})

      bodyObjcet.find('.content').css({'margin-left': '245px'})
      $('.fsatollenav').attr('style', 'display: block !important')
    } else {
      let bodyObjcet = $('body')

      bodyObjcet.find('.menue-drawrCustom').hide()
      bodyObjcet.find('.header').css({left: '65px'})
      bodyObjcet.find('.content').css({'margin-left': '0px'})
    }
  }
  ////////////////    Side Bar Secondary  Controle Function and States End here  //////////////////////////

  return (
    <MasterlayoutContext.Provider
      value={{HasparentState, subMenuRecive, titleSubmenu, subMenueClickReciver,successMessageSupport, setsuccessMessageSupport}}
    >
      {props.children}
    </MasterlayoutContext.Provider>
  )
}
export default MasterLayoutState
