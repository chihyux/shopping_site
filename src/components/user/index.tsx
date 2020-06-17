import React,{ useState, useEffect, useContext } from 'react'
import { Button, Drawer, List, Skeleton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Auth } from 'contexts/authContext';
import firebase from '../../config/config'
import { OrderedWrapper } from './Styled'

const User:React.FC = () => {
    const { uid } = useContext(Auth)
    const [orderedList, setOrderedList] = useState([] as any)

    useEffect(() => {
        if(uid) {
        const unsubscribe = firebase.firestore()
        .collection('ordered')
        .doc(uid)
        .onSnapshot((doc) => {
          const orderedList = doc.data()
          console.log(orderedList)
          if(orderedList) {
              const getList: any[] = [...Object.values(orderedList)]
            setOrderedList(getList)
          }
        })
    
        return () => unsubscribe()
        }
    }, [])

    const cartDetail = (
        <List
        itemLayout="horizontal"
        dataSource={orderedList}
        renderItem={(item:any) => (
            <List.Item
                key={item.id}
            >
                <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                    title={item.name}
                    description={ 
                                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                                        <span className='ordered-id'>訂單編號: {item.id}</span>
                                        <span>下單時間: {new Date(item.date).toString()}</span>
                                        {item.list.map((listItem:any) => {
                                           return (
                                            <>
                                            
                                            <span className='ordered-name'>{listItem.name}</span>
                                            <span>顏色: {listItem.color}</span>
                                            <span>尺寸: {listItem.size}</span>
                                            <span>數量: {listItem.count}</span>  
                                            </>
                                           ) 
                                        })}
                                        <span>狀態: {item.status}</span>
                                </div>
                                }
                />
                </Skeleton>
            </List.Item>
            )}
        />
    )
    return (
        <OrderedWrapper>
        <h5>訂購清單</h5>
        {cartDetail}
        </OrderedWrapper>   
    )
}

export default User