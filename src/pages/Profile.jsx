import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchProfile } from '../store/userSlice'
import Account from '../components/Account'
import EditUsername from '../components/EditUsername'

const accounts = [
  {
    id: 1,
    title: 'Argent Bank Checking (x8349)',
    amount: '$2,082.79',
    description: 'Available Balance',
  },
  {
    id: 2,
    title: 'Argent Bank Savings (x6712)',
    amount: '$10,928.42',
    description: 'Available Balance',
  },
  {
    id: 3,
    title: 'Argent Bank Credit Card (x8349)',
    amount: '$184.30',
    description: 'Current Balance',
  },
]

function Profile() {
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector((state) => state.user)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <main className="main bg-dark">
      <div className="header">
         {isEditing ? (
          <EditUsername onClose={() => setIsEditing(false)} />
        ) : (
          <>
        <h1>Welcome back<br />{firstName} {lastName}!</h1>
        <button className="edit-button" onClick={() => setIsEditing(true)} >Edit Name</button>
        </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  )
}

export default Profile