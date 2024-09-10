import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckinOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if(!booking) return <Empty resource='booking' />

    const { status, id: bookingId } = booking || {};

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens="deleteBooking">
                        <Button icon={<HiTrash />} variation="danger">
                            Delete booking #{bookingId}
                        </Button>
                    </Modal.Open>
                    {status === "unconfirmed" && (
                        <Button
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check in
                        </Button>
                    )}
                    {status === "checked-in" && (
                        <Button
                            icon={<HiArrowUpOnSquare />}
                            onClick={() => checkout(bookingId)}
                            disabled={isCheckinOut}
                        >
                            Check out
                        </Button>
                    )}
                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                    <Modal.Window name="deleteBooking">
                        <ConfirmDelete
                            resourceName={`${booking.guests.fullName} booking`}
                            onConfirm={() =>
                                deleteBooking(bookingId, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;