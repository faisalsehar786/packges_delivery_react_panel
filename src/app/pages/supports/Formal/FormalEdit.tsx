/* eslint-disable jsx-a11y/anchor-is-valid */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { handleGetRequest } from '../../../services'
import { GalleryDrawer } from '../../Drawer/GalleryDrawer'

export default function FormalEdit() {
  const [initialValues, setInitialValues] = useState({
    title: '',
    short_description: '',
    target_amount: '',
    start_date: '',
    due_date: '',
    status: '',
  })
  const numberRegExp = /^[0-9]\d*$/
  const memberSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    short_description: Yup.string().required('Required'),
    target_amount: Yup.string().matches(
      numberRegExp,
      'Kun tall er tillatt i dette feltet. Bokstaver og andre symboler er ikke tillatt.'
    ),
    start_date: Yup.string().required('Required'),
    // add status to the schema if it exists
    status: initialValues?.status ? Yup.string().required('Required') : Yup.string(),
  })

  const { setLoading } = useContext(LoadingContext)
  const { id } = useParams()
  const [organisation, setOrganisation] = useState<any>()
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)
  const navigate = useNavigate()
  // eslint-disable-next-line prefer-const
  let [startDate, setStartDate] = useState<any>()
  // eslint-disable-next-line prefer-const
  let [endDate, setEndDate] = useState<any>()
  const [bannerImage, setBannerImage] = useState<any>()
  const [toggleSubmit, settoggleSubmit] = useState<any>(false)

  const getGoalDetails = async () => {
    const { data } = await handleGetRequest(`/goal/get_goal_admin/${id}`)(setLoading)
    getOrgDetails(data?.organisation_id)
    setBannerImage(data?.banner_image)
    patchForm(data)
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/formal',
        title: 'Støtte',
      },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/formal',
        title: 'Formål',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/home/formal',
        title: data?.title,
      },
    ])
  }

  const getOrgDetails = async (organisation_id: string) => {
    const { data } = await handleGetRequest(`/organisation/${organisation_id}`)(setLoading)
    setOrganisation(data)
  }

  const getLogo = (): string => {
    if (organisation?.logo) {
      return organisation?.logo
    }
    if (organisation?.org_logo_base64) {
      return `data:image/png;base64,${organisation?.org_logo_base64}`
    }
    return toAbsoluteUrl('/media/misc/logo-missing.jpeg')
  }

  const patchForm = async (data: {
    title: any
    short_description: any
    target_amount: any
    start_date: any
    due_date: any
    status: any
  }) => {
    setStartDate(data?.start_date)
    setEndDate(data?.due_date)

    setInitialValues({
      title: data?.title,
      short_description: data?.short_description,
      target_amount: data?.target_amount,
      start_date: data?.start_date,
      due_date:
        data?.due_date === '3024-01-01T00:00:00.000Z'
          ? ''
          : data?.due_date
            ? moment(data?.due_date).format('YYYY-MM-DD')
            : '',
      status: data?.status,
    })
  }

  const setDate = (field: any, date: any) => {
    if (field === 'startDate') {
      initialValues.start_date = date
      startDate = date
    }
    if (field === 'dueDate') {
      initialValues.due_date = date
      endDate = date
    }
  }

  const submitStep = async (values: any) => {
    const reFactorValue = `'${values?.target_amount}'`
    values.target_amount = Number(
      reFactorValue?.replace(/[~`!@#$%^&*()+={}[\];:'"<>.,/\\?-_]/g, '')
    )

    if (toggleSubmit) {
      navigate(`/home/formalSingle/${id}`)
    }
  }

  const getHeaderImage = (): string => {
    return `url(${bannerImage || toAbsoluteUrl('/media/misc/Header-1.jpg')})`
  }

  useEffect(() => {
    getGoalDetails()
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Rediger formål</h3>

        <div className='d-flex flex-wrap my-2'>
          <Link to='/home/formal' className='me-4'>
            <button className='btn btn-primary'>Formål oversikt</button>
          </Link>

          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>30 Days</a>
            </div>
            {/* end::Menu item */}

            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>90 Days</a>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu */}
        </div>
      </div>
      <div className='card mb-5 mb-xl-8'>
        <div className='modal-body px-12 py-12'>
          <div
            className='card card-xl-stretch mb-xl-10 card_borderC'
            style={{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundImage: getHeaderImage(),
              borderRadius: '8px',
              position: 'relative', // add position relative to the banner
            }}
          >
            {/* begin::Body */}
            <div className='p-5 d-flex flex-column'>
              {/* begin::Wrapper */}
              <div
                className='d-flex flex-column flex-grow-1'
                style={{ height: 100, minHeight: 100, width: '100%' }}
              />

              <div className='pt-5'>
                <div className='d-flex ' style={{ alignItems: 'center' }}>
                  <div
                    className='card bg-white me-3 p-2'
                    style={{ border: '2px solid #F1F2F9', borderRadius: '8px' }}
                  >
                    <img
                      src={toAbsoluteUrl('/media/logos/slogo.jpg')}
                      alt='logo'
                      className=' h-60px logo svg-icon-cufs '
                      style={{ width: '60px', objectFit: 'contain' }}
                    />
                  </div>

                  <div
                    className='card bg-white me-3 p-2'
                    style={{ border: '2px solid #F1F2F9', borderRadius: '8px' }}
                  >
                    <img
                      src={getLogo()}
                      alt='logo'
                      className=' h-60px logo svg-icon-cufs '
                      style={{ width: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={submitStep}
            enableReinitialize
            encType='multipart/form-data'
            validationSchema={memberSchema}
          >
            {({ values, errors, touched }) => (
              <Form>
                <div className=''>
                  <div>
                    <h3 className='fw-bolder my-2'>Rediger formål</h3>
                    <div className=' fontsizechfslogtime d-flex align-items-center text-gray-400  me-5 mt-6 '>
                      Bruk skjemaet under til å opprette et nytt formål. Gi formålet en tittel, velg
                      start- og sluttdato og oppgi totalbeløpet for ønsket støtte.
                      <br />
                      Lag en god beskrivelse av formålet, slik at støttespillere forstår hva støtten
                      går til.
                    </div>
                  </div>
                  <div className='row mb-6 mt-8'>
                    <div className='col-lg-2 '>
                      <label className='col-form-label fw-bold fs-6'>Formål tittel:</label>
                    </div>
                    <div className='col-md-10'>
                      <Field
                        type='text'
                        name='title'
                        className={clsx('form-control form-control-lg mb-3 mb-lg-0', {
                          'is-invalid': touched.title && errors.title,
                        })}
                        placeholder='Angi tittel på formåle'
                      />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-2 '>
                      <label className='col-form-label fw-bold fs-6'>Start og slutt dato:</label>
                    </div>

                    <div className='col-md-10 row pe-0'>
                      <div className='col-md-6'>
                        <Field
                          type='date'
                          name='start_date'
                          dateSy
                          pattern='\d{2}.\d{2}.\d{4}'
                          className={clsx('form-control form-control-lg w-100', {
                            'is-invalid': touched.start_date && errors.start_date,
                          })}
                          placeholder='Start og slutt dato'
                          component={() => (
                            <DatePicker
                              placeholderText='Startdato'
                              dateFormat='dd.MM.yyyy'
                              calendarStartDay={1}
                              className={clsx('form-control form-control-lg w-100  inputClass', {
                                'is-invalid': touched.start_date && errors.start_date,
                              })}
                              onChange={(date: Date) => {
                                setDate('startDate', moment(date).format('YYYY-MM-DD'))
                                setStartDate(date)
                              }}
                              selected={startDate ? new Date(startDate) : null}
                            />
                          )}
                        />
                        <div className='text-danger'>
                          <ErrorMessage name='start_date' />
                        </div>
                      </div>

                      <div className='col-md-6 pe-0'>
                        <Field
                          type='date'
                          name='due_date'
                          className={clsx('form-control form-control-lg', {
                            'is-invalid': touched.start_date && errors.start_date,
                          })}
                          placeholder='Sluttdato'
                          pattern='\d{2}.\d{2}.\d{4}'
                          component={() => (
                            <DatePicker
                              placeholderText='Sluttdato'
                              dateFormat='dd.MM.yyyy'
                              calendarStartDay={1}
                              className='form-control form-control-lg w-100  inputClass'
                              onChange={(date: Date) => {
                                setDate('dueDate', moment(date).format('YYYY-MM-DD'))
                                setEndDate(date)
                              }}
                              selected={endDate ? new Date(endDate) : null}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <div className='col-lg-2'>
                      <label className=' col-form-label fw-bold fs-6 '>Innsamlingsmål:</label>
                    </div>
                    <div className='col-md-10'>
                      <Field
                        type='text'
                        name='target_amount'
                        value={values.target_amount}
                        className={clsx('form-control form-control-lg')}
                        placeholder='Skriv inn beløpet du ønsker å oppnå'
                      />
                      <div className='text-danger'>
                        <ErrorMessage name='target_amount' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <div className='col-lg-2'>
                    <label className=' col-form-label fw-bold fs-6'>Beskrivelse:</label>
                  </div>

                  <div className='col-lg-10'>
                    <CKEditor
                      editor={ClassicEditor}
                      data={initialValues?.short_description || ' '}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        initialValues.short_description = data
                      }}
                      config={{
                        toolbar: [
                          'heading',
                          '|',
                          'bold',
                          'italic',
                          'blockQuote',
                          'numberedList',
                          'bulletedList',
                          '|',
                          'undo',
                          'redo',
                        ],
                      }}
                    />
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-lg-2'>
                    <label className=' col-form-label fw-bold fs-6'>Status:</label>
                  </div>
                  <div className='col-lg-10'>
                    <Field name='status' className='form-select form-select-lg fw-bold' as='select'>
                      {/* "active", "completed", "paused", "canceled" */}
                      <option value='active'>Aktiv</option>
                      <option value='completed'>Fullført</option>
                      <option value='paused'>Pauset</option>
                      <option value='canceled'>Avbrutt</option>
                    </Field>
                  </div>
                </div>

                <div className='col-md-10 offset-md-2 d-flex justify-content-between'>
                  <Link to='/home/formal'>
                    <button type='button' className='btn btn-sm btn-light' data-bs-dismiss='modal'>
                      Avbryt
                    </button>
                  </Link>

                  <div>
                    <button
                      type='submit'
                      className='btn btn-sm btn-primary mx-2'
                      onClick={() => settoggleSubmit(false)}
                    >
                      <span className='indicator-label'>Lagre</span>
                    </button>

                    <button
                      type='submit'
                      className='btn btn-sm btn-primary'
                      onClick={() => settoggleSubmit(true)}
                    >
                      <span className='indicator-label'>Lagre og lukk </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <GalleryDrawer
        handleSuccess={(image: string | null) => {
          setBannerImage(image)
        }}
      />
    </>
  )
}
