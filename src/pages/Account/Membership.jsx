import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ThemeContext } from '../../context/ThemeContext'
import { Input, Button, Radio, Divider, Card } from 'antd'
import {
  CreditCardOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExportOutlined,
  HistoryOutlined,
  IdcardOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Cart from '../Cart/Cart'
import AccessoriesCard from '../../components/Cards/AccessoriesCard'
import CustomModelOne from '../../components/CustomModel/CustomModel'
import CustomModelViewProduct from '../../components/CustomModel/CustomModelViewProduct'
import CardData from './MembershipComp/CardData'
import Plane from './MembershipComp/Plane'
import Thanks from './MembershipComp/Thanks'

const Membership = () => {
  const { theme } = useContext(ThemeContext)
  const [currentStage, setCurrentStage] = useState(1)

  return (
    <>
      <div>
        <div className="relative flex items-center justify-between">
          <div
            className="text-3xl w-fit z-10"
            style={{ backgroundColor: theme.background }}
          >
            Become Member
          </div>
          <div
            className="absolute bg-transparent h-0.5 rounded w-full z-0"
            style={{ backgroundColor: theme.textColor }}
          ></div>
        </div>
      </div>
      {currentStage === 1 ? (
        <Plane changeStage={setCurrentStage} />
      ) : currentStage === 2 ? (
        <CardData changeStage={setCurrentStage} />
      ) : (
        <Thanks changeStage={setCurrentStage} />
      )}
    </>
  )
}

export default Membership
