import React from "react";
import { Card } from "antd";
import styles from "./css/SimplePopup.css";
import { CloseOutlined } from "@ant-design/icons";

const SimplePopup = ({ popupId, title,text2,text3,text4,text5,onClose }) => {
  return (
    <div className={styles.popupContainer}>
      <div id={popupId}>
        <Card
          className={styles.popupCard}
          size="small"
          title={title}
          extra={<CloseOutlined onClick={onClose} />}
        >
          <p>Superficie : {text2} m²</p>
          <p>Prix : {text3} dhs</p>
          <p>Type de bien : {text4}</p>
          <p>Type de contrat : {text5}</p>
          <button className="btn btn-primary">Detail</button>
        </Card>
      </div>
    </div>

    
  );
};

export default SimplePopup;
