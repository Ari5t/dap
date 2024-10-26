const func = async () => {
  const response = await window.storages.messages()
  console.log(response) // prints out 'pong'
}

func()