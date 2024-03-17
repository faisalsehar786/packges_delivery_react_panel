import { toAbsoluteUrl } from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen'>
      <img src={toAbsoluteUrl('/media/logos/logo-demo4.svg')} alt='Start logo' />
      <span>Loading ...</span>
    </div>
  )
}
