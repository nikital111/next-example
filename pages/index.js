import { AppBar, Avatar, Box, Button, Container, IconButton, Paper, Toolbar, Typography, Icon, TextField, Input, Backdrop, Hidden } from '@material-ui/core';
import Head from 'next/head';
import myStyles from '../styles/Home.module.css';
import { AddAlert, Create, Mail, Phone, AccountBox } from '@material-ui/icons';
import { useEffect, useState } from 'react';
export default function Home() {
  const [isEdit, setIsEdit] = useState(false);
  const [back, setBack] = useState(false);
  const [back2, setBack2] = useState(false);
  const [backErr, setBackErr] = useState(false);
  const [localData, setLocalData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [err, setErr] = useState({
    name: '',
    email: '',
    phone: ''
  });
  useEffect(() => {
    setLocalData({
      name: `${localStorage.getItem('name') ? localStorage.getItem('name') : 'Иванова Анна Михайловна'}`,
      email: `${localStorage.getItem('email') ? localStorage.getItem('email') : 'ivanova@mail.ru'}`,
      phone: `${localStorage.getItem('phone') ? localStorage.getItem('phone') : 'Укажите номер телефона'}`,
    })
  }, [])
  const checkErrorPhone = (e) => {
    let value = e.target.value;
    setData({ ...data, phone: value })
    setErr({ ...err, phone: '' });
    let reg = new RegExp(/^[+]\d*$/).test(value)
    if (!reg) {
      setErr({ ...err, phone: 'Неверный формат' })
    }
  }
  const checkErrorEmail = (e) => {
    let value = e.target.value;
    setData({ ...data, email: value })
    setErr({ ...err, email: '' });
    let reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value);
    if (!reg) {
      setErr({ ...err, email: 'Вы ввели неправильный email' })
    }
  }
  const checkErrorName = (e) => {
    let value = e.target.value;
    setData({ ...data, name: value })
    setErr({ ...err, name: '' });
    let reg = new RegExp(/^[а-яА-Я]+(([а-яА-Я ])?[а-яА-Я]*)*$/).test(value);
    if (!reg) {
      setErr({ ...err, name: 'Вы неправильно ввели ФИО' })
    }
  }

  const saveData = () => {
    fetch('http://jsonplaceholder.typicode.com/posts', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'x-token-access': 'random'
      },
      body: JSON.stringify(data)
    })
    setLocalData({
      name: data.name,
      email: data.email,
      phone: data.phone
    })
    setBack(false)
    setBack2(true)
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('phone', data.phone);
  }
  return (
    <>
      <Head>
        <title>test</title>
        <meta name='keywords' content='js,next,react'></meta>
        <meta name='description' content='create next app'></meta>
        <meta charSet='utf-8'></meta>
      </Head>

      <AppBar color='transparent' position='static' className={myStyles.myHead} style={{ 'boxShadow': 'none' }}>
        <Container style={{ margin: '0px', maxWidth: '1400px', padding: '0px 10px' }}>
          <Toolbar className={myStyles.myToolbar}>
            <IconButton>
              <AddAlert fontSize='large' style={{ color: 'white' }} />
            </IconButton>
            <div className={myStyles.vr}>

            </div>
            <Avatar ></Avatar>
            <Hidden xsDown>
              <Typography style={{ color: 'white', 'marginLeft': '12px' }}>
                {localData.name.split(' ').length > 1 ? localData.name.split(' ')[0] + ' ' + localData.name.split(' ')[1][0] + '.' : localData.name}
              </Typography>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>

      <Container style={{ 'paddingLeft': '0px', margin: '0px 20px' }} >
        <Typography variant='h6' style={{ color: 'white' }} >
          ЛИЧНЫЙ ПРОФИЛЬ
          </Typography>
        <Typography variant='h6' style={{ color: 'white', 'fontSize': '14px' }}>
          Главная/Личный профиль
          </Typography>
      </Container>

      <Container className={myStyles.contTitle} style={{ 'display': 'flex', margin: '20px 20px', maxWidth: '1400px', width: 'auto' }}>
        <Box className={myStyles.boxTitle}>
          <Avatar></Avatar>
          <Typography variant='h4' style={{ color: 'white', flex: 'none', marginLeft: '10px' }} >
            {localData.name}
          </Typography>
        </Box>
        <Box className={myStyles.boxTitle}>
          <Hidden xsDown>
            <Typography variant='h6' style={{ cursor: 'pointer', color: 'white', marginRight: '10px', fontSize: '15px' }} className={myStyles.ed} onClick={() => { setIsEdit(!isEdit) }}>
              РЕДАКТИРОВАТЬ
          </Typography>
          </Hidden>
          <IconButton onClick={() => { setIsEdit(!isEdit) }}>
            <Create style={{ color: 'white' }}>
            </Create>
          </IconButton>
        </Box>
      </Container>

      <Container className={myStyles.paperInfo} style={{ 'display': 'flex', padding: '40px', margin: '0px 20px', maxWidth: '1400px', width: 'auto' }}>
        {!isEdit ? (
          <>
            <Box className={myStyles.boxPaper}>
              <Icon style={{ 'color': '#00BFA5', marginRight: '20px' }}>
                <Mail>
                </Mail>
              </Icon>
              <Typography>
                {localData.email}
              </Typography>
            </Box>
            <Box className={myStyles.boxPaper}>
              <Icon style={{ 'color': '#00BFA5', marginRight: '20px' }}>
                <Phone>
                </Phone>
              </Icon>
              <Typography>
                {localData.phone}
              </Typography>
            </Box>
          </>
        ) :
          <>
            <form className={myStyles.formInfo} autoComplete="off" >
              <Box>
                <Hidden xsDown>
                  <Icon style={{ 'color': '#00BFA5', margin: '15px' }}>
                    <AccountBox></AccountBox>
                  </Icon>
                </Hidden>
                <TextField
                  id="name"
                  placeholder="Укажите ваше ФИО"
                  label='ФИО'
                  variant="outlined"
                  onChange={checkErrorName}
                  required
                  error={Boolean(err.name)}
                  helperText={err.name}
                  style={{ margin: '0px 15px 0px 15px', width: '264px' }}
                  data-validators="isRequired,isAlpha"
                />
              </Box>
              <Box>
                <Hidden xsDown>
                  <Icon style={{ 'color': '#00BFA5', margin: '15px' }}>
                    <Mail></Mail>
                  </Icon>
                </Hidden>
                <TextField
                  id="email"
                  placeholder="ivanova@mail.ru"
                  label='Email'
                  variant="outlined"
                  onChange={checkErrorEmail}
                  required
                  error={Boolean(err.email)}
                  helperText={err.email}
                  style={{ margin: '0px 15px 0px 15px', width: '264px' }}
                  type='email'
                />
              </Box>
              <Box>
                <Hidden xsDown>
                  <Icon style={{ 'color': '#00BFA5', margin: '15px' }}>
                    <Phone></Phone>
                  </Icon>
                </Hidden>
                <TextField
                  id="phone"
                  placeholder="Укажите номер телефона"
                  label='Номер телефона'
                  variant="outlined"
                  onChange={checkErrorPhone}
                  required
                  error={Boolean(err.phone)}
                  helperText={err.phone}
                  style={{ margin: '0px 15px 0px 15px', width: '264px' }}
                />
              </Box>
            </form>
            <Button type='submit' onClick={() => { if (!err.name && !err.phone && !err.email && data.name && data.phone && data.email) { setBack(true) } else { setBackErr(true) } }} className={myStyles.submitButtInfo} style={{ backgroundColor: '#01BDA7', marginTop: '40px', borderRadius: '36px', color: 'white', fontSize: '12px' }}>
              Сохранить изменения
            </Button>
          </>
        }
      </Container>

      <Backdrop open={backErr} style={{ zIndex: '9999' }}>
        <Paper style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '90px', borderRadius: '15px' }}>
          <Typography variant='h4' align='center'>
            Для начала введите данные корректно!
          </Typography>
          <Button onClick={() => { setBackErr(false) }} className={myStyles.submitButtInfo} style={{ backgroundColor: '#01BDA7', marginTop: '40px', borderRadius: '36px', color: 'white', fontSize: '12px' }}>
            Хорошо
          </Button>
        </Paper>
      </Backdrop>

      <Backdrop open={back} style={{ zIndex: '9999' }}>
        <Paper style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '90px', borderRadius: '15px' }}>
          <Button onClick={() => { setBack(false) }} style={{ position: 'absolute', top: '0px', right: '0px' }}>
            X
          </Button>
          <Typography variant='h4' align='center'>
            Сохранить изменения?
          </Typography>
          <Button onClick={saveData} className={myStyles.submitButtInfo} style={{ backgroundColor: '#01BDA7', marginTop: '40px', borderRadius: '36px', color: 'white', fontSize: '12px' }}>
            Сохранить
          </Button>
          <Button onClick={() => { setBack(false) }} className={myStyles.submitButtInfo} style={{ backgroundColor: 'white', border: '1px solid #01BDA7', marginTop: '20px', borderRadius: '36px', color: '#01BDA7', fontSize: '12px' }}>
            Не сохранять
          </Button>
        </Paper>
      </Backdrop>

      <Backdrop open={back2} style={{ zIndex: '9999' }}>
        <Paper style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '90px', borderRadius: '15px' }}>
          <Typography variant='h4' align='center'>
            Данные успешно сохранены
          </Typography>
          <Button onClick={() => { setBack2(false) }} className={myStyles.submitButtInfo} style={{ backgroundColor: '#01BDA7', marginTop: '40px', borderRadius: '36px', color: 'white', fontSize: '12px' }}>
            Хорошо
          </Button>
        </Paper>
      </Backdrop>
    </>
  )
}
