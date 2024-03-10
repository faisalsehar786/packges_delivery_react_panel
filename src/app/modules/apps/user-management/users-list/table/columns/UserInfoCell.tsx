/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers'
import { User } from '../../core/_models'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({ user }) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <Link to='/user-mangement/user-single'>
        {user.avatar ? (
          <div className='symbol-label'>
            <img src={toAbsoluteUrl(`/media/${user.avatar}`)} alt={user.name} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${user.initials?.state}`,
              `text-${user.initials?.state}`
            )}
          >
            {user.initials?.label}
          </div>
        )}
      </Link>
    </div>
    <div className='d-flex flex-column'>
      <Link to='/user-mangement/user-single' className='text-gray-800 text-hover-primary mb-1'>
        {user.name}
      </Link>
      <span>{user.email}</span>
    </div>
  </div>
)

export { UserInfoCell }
