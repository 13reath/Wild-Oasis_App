import Button from '../../ui/Button';
import CreateCabinForm from '../../features/cabins/CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from '../../features/cabins/CabinTable';

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add New Cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>

                {/* <Modal.Open opens="table">
                <Button>Show Table</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window> */}
            </Modal>
        </div>
    );
}
export default AddCabin;
