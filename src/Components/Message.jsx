import React from 'react'
import { HStack, Avatar, Text } from "@chakra-ui/react"
const Message = ({ text, uri, user="other" }) => {
    return (
        <HStack paddingY={"1"} paddingX={user==="me"? "3": "2"} bg="gray.100" borderRadius={"base"} alignSelf={user === "me" ? "flex-end" : "flex-start"}>
            {
                user === "other" && <Avatar src={uri} />
            }
            <Text>{text}</Text>
            {
                user === "me" && <Avatar src={uri} />
            }
        </HStack>



    )
}

export default Message