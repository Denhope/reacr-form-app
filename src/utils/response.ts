async function onSubmit(values) {
  console.log(values);

  const response = await fetch('http://localhost:5000/server', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  const result = await response.json();

  // обновляем состояние
  //   setResult({
  //     message: result,
  //     success: response.ok
  //   })
  // }
}
