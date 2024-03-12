declare const window: any;
const tg = window.Telegram.WebApp;

export const UseTg = () =>{
  const onClose = ():void => {
    tg.close();
  };

  const onToggleButton = ():void => {
    tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();
  }

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    onClose,
    onToggleButton
  }
}