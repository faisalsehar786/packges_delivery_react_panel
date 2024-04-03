/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import BreadcrumbsContext from "../../../../_metronic/layout/core/Breadcrumbs";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { useParams, useNavigate } from "react-router-dom";
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePatchRequest,
} from "../../../services";
import Tenderdetails1 from "./Tenderdetails1";
import Gallery from "./Gallery";
import TenderEditFrom from "./TenderEditFrom";
import Customerdetails from "./Customerdetails";
import TenderVariations from "./TenderVariations";
import PaymentRecordTable from "./PaymentRecordTable";
import { Modal } from "react-bootstrap";

export default function TenderSinglePage() {
  const { setLoading } = useContext(LoadingContext);
  const [fetchData, setFetchData] = useState<any>();
  const { id } = useParams();
  const { setBreadcrumbs } = useContext(BreadcrumbsContext);
  const navigation = useNavigate();

  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showModalConfirmComp, setShowModalConfirmComp] =
    useState<boolean>(false);
  const [showModalConfirmCanc, setShowModalConfirmCanc] =
    useState<boolean>(false);
  const handleDelete = async () => {
    setShowModalConfirm(false);
    const { data } = await handleDeleteRequest(`/tender/delete_tender/${id}`)(
      setLoading
    );
    if (data) {
      navigation(-1);
    }
  };

  const handleCompleted = async () => {
    setShowModalConfirm(false);
    const { data } = await handlePatchRequest(
      `/order/complete_order_by_order_no/${fetchData?.order?.order_no}`,
      {}
    )(setLoading);
    if (data) {
      navigation(-1);
    }
  };

  const handleCancel = async () => {
    setShowModalConfirm(false);
    const { data } = await handlePatchRequest(
      `/order/cancel_order_by_order_no/${fetchData?.order?.order_no}`,
      {}
    )(setLoading);
    if (data) {
      navigation(-1);
    }
  };
  const getOrgDetails = async () => {
    const { data } = await handleGetRequest(`/tender/details/${id}`)(
      setLoading
    );
    // const {
    //   customer_id,
    //   driver_id,
    //   files,
    //   tender_variations,
    //   order_awarded,
    //   order,
    //   order_current_location,
    //   location_from,
    //   location_to,
    // } = data

    setFetchData(data);
  };

  useEffect(() => {
    getOrgDetails();
    setBreadcrumbs([
      {
        isActive: false,
        isSeparator: false,
        path: "home/oversikt",
        title: "Home",
      },
      {
        isActive: false,
        isSeparator: false,
        path: "/home/formal",
        title: "HmHy",
      },
      {
        isActive: true,
        isSeparator: false,
        path: "/home/formal",
        title: "Jobber",
      },
    ]);
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Nøkkeltall</h3>

        <div className="d-flex flex-wrap ">
          <div className="">
            <button
              type="button"
              className="btn btn-primary btn-sm me-2"
              onClick={() => navigation(-1)}
            >
              Go Back
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm me-2"
              onClick={() => setShowModalConfirm(true)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm me-2"
              onClick={() => setShowModalConfirmCanc(true)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm me-2"
              onClick={() => setShowModalConfirmComp(true)}
            >
              Complete
            </button>
            {/* <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowModalConfirm(true)}
            >
              Edit
            </button> */}
          </div>
        </div>
      </div>
      <>
        <div className="row">
          <div className="col-xl-6 col-lg-6 ">
            <Tenderdetails1 fhData={fetchData} title="Job Details" />
          </div>

          <div className="col-xl-6 col-lg-6 ">
            <Customerdetails
              fhData={fetchData?.customer_id}
              title="Customer Details"
            />
            <Customerdetails
              fhData={fetchData?.driver_id}
              title="Driver Details"
            />
          </div>
        </div>
        <div className="row">
          <PaymentRecordTable
            title="Payment history"
            id={fetchData?._id}
            order_no={fetchData?.order?.order_no}
          />
        </div>
        <div className="row">
          <div className="col-xl-7 col-lg-7 ">
            <Gallery fhData={fetchData?.files} title="Images" />
          </div>
          <div className="col-xl-5 col-lg-5 ">
            <TenderVariations
              fhData={fetchData?.tender_variations}
              title="Dimission"
            />
          </div>
        </div>
        <Modal
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="modal-title">Vil du slette ?</h5>
            </Modal.Title>
          </Modal.Header>
          <div className="modal-body">
            Er du sikkert på at du vil slette brukeren? Denne handlingen kan
            ikke angres
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                handleDelete();
              }}
              className="btn btn-primary"
            >
              Ja, slett
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setShowModalConfirm(false);
              }}
            >
              Avbryt
            </button>
          </div>
        </Modal>
        <Modal
          show={showModalConfirmCanc}
          onHide={() => setShowModalConfirmCanc(false)}
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="modal-title">Vil du slette ?</h5>
            </Modal.Title>
          </Modal.Header>
          <div className="modal-body">
            Er du sikkert på at du vil slette brukeren? Denne handlingen kan
            ikke angres
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                handleCancel();
              }}
              className="btn btn-primary"
            >
              Ja, slett
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setShowModalConfirmCanc(false);
              }}
            >
              Avbryt
            </button>
          </div>
        </Modal>

        <Modal
          show={showModalConfirmComp}
          onHide={() => setShowModalConfirmComp(false)}
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="modal-title">Vil du slette ?</h5>
            </Modal.Title>
          </Modal.Header>
          <div className="modal-body">
            Er du sikkert på at du vil slette brukeren? Denne handlingen kan
            ikke angres
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                handleCompleted();
              }}
              className="btn btn-primary"
            >
              Ja, slett
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setShowModalConfirmComp(false);
              }}
            >
              Avbryt
            </button>
          </div>
        </Modal>
      </>
    </>
  );
}
