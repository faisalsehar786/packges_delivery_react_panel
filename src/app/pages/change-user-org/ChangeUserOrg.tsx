import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { usePageData } from '../../../_metronic/layout/core'
import BreadcrumbsContext from '../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../_metronic/layout/core/Loading'
import { handleGetRequest, handlePatchRequest } from '../../services'
import OrgSearch from './OrgSearch'
import OrgUsersSearch from './OrgUsersSearch'

const ChangeUserOrg: FC = () => {
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)
  const { setPageTitle } = usePageData()
  const { loading, setLoading } = useContext(LoadingContext)
  const [pushOrgUser, setpushOrgUser] = useState<any>('')
  const [alreadySelectedOrg, setalreadySelectedOrg] = useState<any>('')
  const [pushOrg, setpushOrg] = useState<any>('')
  const [showorg, setshoworg] = useState(false)

  const onSubmit = async () => {
    if (!pushOrg || !pushOrgUser) {
      toast.error(`velg en bruker og en organisasjon!`)
      return
    }

    // console.log({pushOrg: pushOrg, pushOrgUser: pushOrgUser})

    const body = { organisation_id: pushOrg?._id }
    const { data } = await handlePatchRequest(
      `/organisation_user/update_org_user/${pushOrgUser?._id}`,
      body,
      {}
    )(setLoading)
    if (data) {
      setpushOrgUser('')
      setpushOrg('')
      setalreadySelectedOrg('')
      setshoworg(false)

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }
  const reeSet = () => {
    setpushOrgUser('')
    setpushOrg('')
    setalreadySelectedOrg('')
    setshoworg(false)
  }
  const fetchOrg = async (id: any) => {
    const { data }: any = await handleGetRequest(`/organisation/${id}`)(setLoading)
    if (data) {
      setalreadySelectedOrg({
        _id: data?._id,
        label: `${data?.org_name} - ${data?.organisation_number}`,
      })
      setshoworg(true)
    } else {
      setalreadySelectedOrg('')
      setshoworg(false)
    }
  }
  useMemo(() => {
    if (pushOrgUser) {
      setshoworg(true)
      fetchOrg(pushOrgUser?.org_id)
    }
  }, [pushOrgUser])

  useEffect(() => {
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: 'home/change_org',
        title: 'Støtte',
      },
      {
        isActive: true,
        isSeparator: false,
        path: 'home/change_org',
        title: 'Endre bruker organisasjon',
      },
    ])
    setPageTitle('Støtte AS')
  }, [])
  return (
    <div className='card shadow-none rounded-0 border-none'>
      <div className='card-body position-relative' id='kt_pushnotification_body'>
        <div>
          <div className='timeline'>
            <div className='timeline-item'>
              <div className='timeline-line w-40px' />

              <div className='timeline-content mb-10 mt-n1'>
                <div className='overflow-auto pb-5'>
                  <div className=' align-items-center  min-w-700px  py-3 '>
                    <div className='d-flex flex-column mb-7 fv-row fv-plugins-icon-container '>
                      <label className='d-flex align-items-center fs-6 fw-bold mb-2'>
                        <span className=''>Organisasjons brukere</span>
                      </label>
                      <OrgUsersSearch pushOrgUserProp={setpushOrgUser} />
                      <div className='fv-plugins-message-container invalid-feedback' />
                    </div>
                    {showorg ? (
                      <div className='d-flex flex-column mb-7 fv-row fv-plugins-icon-container '>
                        {alreadySelectedOrg ? (
                          <span className='badge py-3 px-4 fs-7 badge-light-success mb-4 text-dark'>
                            Allerede valgt organisasjon: {alreadySelectedOrg?.label}
                          </span>
                        ) : null}

                        <label className='d-flex align-items-center fs-6 fw-bold mb-2'>
                          <span className=''>Organisasjons </span>
                        </label>
                        <OrgSearch pushOrgProp={setpushOrg} />
                        <div className='fv-plugins-message-container invalid-feedback' />
                      </div>
                    ) : null}

                    <div>
                      <div className=' d-flex justify-content-between'>
                        <button
                          type='reset'
                          className='btn btn-light me-3'
                          onClick={() => reeSet()}
                        >
                          Nullstille
                        </button>
                        <button
                          style={{ width: 155 }}
                          type='submit'
                          onClick={() => onSubmit()}
                          className='btn btn-lg btn-primary   authbgcolor'
                        >
                          <span className='indicator-progress'>
                            Lagre
                            {loading && (
                              <span className='spinner-border spinner-border-sm align-middle ms-2' />
                            )}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeUserOrg
