import './App.css';
import { useState, useEffect,useRef } from "react"
import { Box, Container, VStack, HStack, Button, Input } from "@chakra-ui/react"
import Message from "./Components/Message"
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut, } from "firebase/auth"
import app from './firebase';
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"
import { async } from '@firebase/util';

const auth = getAuth(app)
const db = getFirestore(app)

const loginHandler = () => {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
}

const sigOutHandler = () => {
  signOut(auth)
}




function App() {
  const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))
  const [user, setUser] = useState(false)
  const [message, setMassage] = useState("")
  const [messages, setMessages] = useState([])
  const scrollbehavior = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setMassage("")
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      })
      
      scrollbehavior.current.scrollIntoView({behavior:"smooth"})


    } catch (error) {
      alert(error)
    }


  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (data) => {
      // console.log(data);
      setUser(data)
    })


    const unSubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };

        })
      )
    })

    return () => {
      unSubscribe()
      unSubscribeForMessage()
    }
  },[])


  return <Box bg="red.50">
    {
      user ?
        (<Container bg="white" h="100vh">
          <VStack h="full" paddingY={"4"}>
            <Button colorScheme={"red"} width="100%" onClick={sigOutHandler}>Logout</Button>


            <VStack h="full" w={"full"} overflowY={"auto"}>
              {
                messages.map((item) => {
                  return (
                    <Message key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />

                  )
                })
              }

              <div ref={scrollbehavior}></div>

            </VStack>




            <form style={{ width: "100%" }} onSubmit={submitHandler}>

              <HStack>
                <Input placeholder='Enter a Message' value={message} onChange={(e) => setMassage(e.target.value)} />
                <Button type='submit' colorScheme={"purple"}>Send</Button>
              </HStack>
            </form>
          </VStack>
        </Container>)
        : (

          <VStack bg="white" h="100vh" justifyContent={"center"}>
            <Button onClick={loginHandler} colorScheme={"purple"}>Sign In With Google</Button>
          </VStack>)
    }



  </Box>
}

export default App;
