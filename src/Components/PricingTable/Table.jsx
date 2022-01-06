import React from "react"
import TableComponent from "../Table/TableComponent";
import './table.scss';
import { textAnimation, headerAnimation, cardAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const Table = () => {
    const [element, controls] = useScroll();
    return (
        <div className="initiate" ref={element}>
           
            <div className="table1" >
            
                <TableComponent text1={"Men`s Shirts Laundered and Pressed"} text2={"Men`s button down shirts. Collar support included on Hanger."} text3={"$2.75"} />
                <TableComponent text1={"Wash & Fold Laundry"} text2={"Undergarments,PJ`s, t-shirts etc.. anything you like to wash and fold without pressing."} text3={"$2.25"} />
                <TableComponent text1={"Two Piece Suit"} text2={"Dry Clean two piece suit. Men and Women. Sleeves filled with tissue to avoid crease."} text3={"$12.50"} />

                <TableComponent text1={"Pants"} text2={"Dry Clean Pants."} text3={"$7.50"} />

                <TableComponent text1={"Sports Coat or Suit Jacket"} text2={"Casual Sport Coat or Suit Jacket. Sleeves filled with tissue to avoid crease."} text3={"$9.00"} />

                <TableComponent text1={"Sweater"} text2={"Any Sweater, folded or hang inside a sweater bag to keep it clean and fresh."} text3={"$7.50"} />
                <TableComponent text1={"Coat 3/4 Length"} text2={"Coat 3/4 Length. Linning included. Sleeves are filled with tissue to avoid crease."} text3={"$17.50"} />
                <TableComponent text1={"Heavy Coat or Full Length"} text2={"Men`s button down shirts. Collar support included on Hanger."} text3={"$2.75"} />
                <TableComponent text1={"Blouse"} text2={"Laundered,Dry Clean and Pressed Blouse."} text3={"$6.50"} />
                <TableComponent text1={"Dress"} text2={"One Piece Dress with or without Linning."} text3={"$12.00"} />
                <TableComponent text1={"Skirt"} text2={"Skirt with or without Linning."} text3={"$6.00"} />
                <TableComponent text1={"Tie"} text2={"Men`s Tie"} text3={"$5.50"} />
                <TableComponent text1={"Scarf"} text2={"Men and Women Scarf."} text3={"$5.75"} />
                <TableComponent text1={"Shorts"} text2={"Men and Women Shorts."} text3={"$5.75"} />
                <TableComponent text1={"Vest"} text2={"Men and Women Vest."} text3={"$5.50"} />
                <TableComponent text1={"Comforter Double/Twin"} text2={"Comforter Double/Twin size."} text3={"$38.50"} />
                <TableComponent text1={"Comforter Queen Size"} text2={"Comforter Queen Size."} text3={"$42.50"} />
                <TableComponent text1={"Comforter King Size"} text2={"Comforter King Size."} text3={"$46.55"} />
                <TableComponent text1={"Table Cloth Large Size"} text2={"Table Cloth Large Size."} text3={"$18.50"} />
                <TableComponent text1={"Table Cloth Medium"} text2={"Table Cloth Medium"} text3={"$15.50"} />
                <TableComponent text1={"Men`s shirt folded"} text2={"Men`s button down shirts folded and packed in a box. Collar support included."} text3={"$3.25"} />

            </div>
            
        </div>
    )
}

export default Table
