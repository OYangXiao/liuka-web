export default function (gotoaddress: string = '/account') {
    sessionStorage.setItem('afterLogin', window.location.pathname)
    alert('goto ' + gotoaddress)
    window.location.href = gotoaddress
}