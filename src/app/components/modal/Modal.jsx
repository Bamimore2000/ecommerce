import { MdDeleteOutline } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const Modal = ({ open, setOpen, setAction}) => {

  return open && <main onClick={ ()=> setOpen(false)} className="fixed inset-0 z-9999 bg-black/30 grid place-items-center">
  <article onClick={(e)=> e.stopPropagation()} className="modal flex flex-col justify-between card max-w-[90%] md:min-w-[576px] md:max-w-[576px] max-h-[80vh] bg-white text-black px-5 py-5 min-h-[180px] mx-auto">
      <div  className="header flex justify-between">
        <div className="message text-lg">Remove from cart</div>
        <div onClick={()=> setOpen(false)} className="cancel text-xl cursor-pointer"><FaTimes size={25} /></div>
      </div>
      <div className="message">Do you really want to remove this item from cart?</div>
      <button onClick={()=> {
        setOpen(false);
        setAction();
      }} className="action relative bg-blue-500 px-[6px] hover:bg-blue-600 flex justify-center card py-[12px] h-[100%] text-white w-full">
            <span className="absolute left-[6px] deleteIcon"><MdDeleteOutline size={30} /></span>
            <span className="remove-item self-center">REMOVE ITEM</span>
      </button>
  </article>
  
</main>}
export default Modal