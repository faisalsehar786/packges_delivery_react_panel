import React, {
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import LoadingContext from "../../../_metronic/layout/core/Loading";
import { handleGetRequest, handlePatchRequest } from "../../services";

const GalleryDrawer: FC<{
  handleSuccess: (image_url: string | null) => void;
}> = ({ handleSuccess }) => {
  const params: string | undefined = useParams()["*"];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { setLoading } = useContext(LoadingContext);

  const onUpdate = async () => {
    // split the url based on / and get the last element
    const id = params && params.split("/").pop();

    const body = {
      banner_image: selectedImage,
    };
    const { success } = await handlePatchRequest(
      `/goal/update_goal_admin/${id}`,
      body
    )(setLoading);
    if (success) {
      // close the drawer
      const galleryClose = document.getElementById("kt_gallery_close");
      galleryClose?.click();
      handleSuccess(selectedImage);
    }
  };

  // on kt_gallery_close click remove the selected image
  useEffect(() => {
    const galleryClose = document.getElementById("kt_gallery_close");
    galleryClose?.addEventListener("click", () => {
      setSelectedImage(null);
    });
  }, []);

  return (
    <div
      id="kt_gallery"
      className="bg-white"
      data-kt-drawer="true"
      data-kt-drawer-name="notification"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '400px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_gallery_toggle"
      data-kt-drawer-close="#kt_gallery_close"
    >
      <div className="card shadow-none rounded-0 border-none">
        <div
          className="card-header  border-0"
          id="kt_gallery_header"
          style={{
            flexWrap: "nowrap",
          }}
        >
          <div className="menu-content d-flex align-items-center">
            {/* <div className='symbol symbol-50px me-5'>
              <img
                className='card'
                style={{
                  borderRadius: '8px',
                  height: '50px',
                  width: '50px',
                }}
                alt='Logo'
                src={selectedImage || currentUser?.user?.image  || toAbsoluteUrl('/media/avatars/300-1.jpg')}
              />
            </div> */}

            <div className="d-flex flex-column">
              <div
                className="fw-bolder d-flex align-items-center fs-5 uppercase
              "
              >
                Jobber banner
                {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
              </div>
              <div
                className="fs-8 text-muted fw-bold  float-end"
                style={{
                  // textTransform: 'capitalize',
                  width: "100%%",
                }}
              >
                Velg et passende banner bilde til ditt Jobber
              </div>

              <a
                href="/"
                className="fw-bold text-muted text-hover-primary fs-7"
              >
                {/* {currentUser ? currentUser?.user?.email : ""} */}
              </a>
            </div>
          </div>

          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary  min-w-auto"
              id="kt_gallery_close"
            >
              <i className="fa-duotone fa-rectangle-xmark svg-icon svg-icon-2 fs-2" />
              {/* <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' /> */}
            </button>
          </div>
        </div>
        <div
          className="card-body position-relative pt-1"
          id="kt_activities_body"
        >
          <div
            id="kt_activities_scroll"
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers="#kt_activities_body"
            data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer"
            data-kt-scroll-offset="5px"
            className="pt-3"
          >
            <div className="separator" />
            <div className=" align-items-center  min-w-350px  py-3 ">
              <Gallery
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
              />

              {/* <div className='my-6 d-flex '>
                <i className='bi bi bi-grid-3x3-gap-fill ' />
                <div className='ms-4'>
                  <h3 className='fs-7  text-gray-900 mb-1'>Account ID</h3>
                  <span className=' fs-7 text-gray-400'>
                    {currentUser ? currentUser.user._id : ''}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-md-12  d-flex justify-content-between p-8">
          <button
            type="button"
            className="btn btn-sm btn-light"
            id="kt_gallery_close"
          >
            Avbryt
          </button>

          <button
            disabled={!selectedImage}
            onClick={onUpdate}
            type="submit"
            className="btn btn-sm btn-primary"
          >
            <span className="indicator-label">Oppdater Jobber</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { GalleryDrawer };

interface GalleryProps {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<SetStateAction<string | null>>;
}

const Gallery: FC<GalleryProps> = ({ selectedImage, setSelectedImage }) => {
  const galleryToggleRef = useRef(null);
  const [images, setImages] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const getImages = async () => {
    const { data } = await handleGetRequest(`/orgImages/banner`)(setLoading);
    setImages(data);
  };

  const handleImageClick = (image_url: string) => {
    setSelectedImage(image_url);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getImages();
        }
      },
      { threshold: 0.5 }
    );

    const currentGalleryToggleRef = galleryToggleRef.current;

    if (currentGalleryToggleRef) {
      observer.observe(currentGalleryToggleRef);
    }

    return () => {
      if (currentGalleryToggleRef) {
        observer.unobserve(currentGalleryToggleRef);
      }
    };
  }, []);

  return (
    <div className="row g-1 mt-2 kt_gallery_toggle" ref={galleryToggleRef}>
      {/* <div ref={galleryToggleRef} className='kt_gallery_toggle'></div> */}
      {images.map(({ image_url }) => (
        <div
          key={image_url}
          className="col-12"
          onClick={() => handleImageClick(image_url)}
        >
          <div className=" ">
            <img
              src={image_url}
              className={`card-img mb-3 h-100 w-100 pointer ${
                selectedImage === image_url
                  ? `border borderC shadow-sm  border-2`
                  : ""
              }`}
              style={{ objectFit: "cover" }}
              alt="img"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export { Gallery };
