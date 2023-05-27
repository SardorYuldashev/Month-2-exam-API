=========USERS ROUTES=======================================================

===1-2=== "POST /users/register" (admin) yoki "POST /users" (customer) so'rovi orqali ro'yxatdan o'tish mumkin. req.bodyda jo'natish kerak:
  firstName - string/min-1 ta simvol/majburiy
  lastName - string/min-1 ta simvol/majburiy
  email - string/email bo'lishi shart/majburiy
  password - string/min-6 ta simvol/majburiy



===3=== "POST /users/login" so'rovi orqali login qilish mumkin. req.bodyda jo'natish kerak:
  email - string/email bo'lishi shart/majburiy
  password - string/min-6 ta simvol/majburiy

***javob sifatida token qaytadi.


===4=== "GET /users" so'rovi yordamida faqatgina adminlar superAdmindan boshqa hamma foydalanuvchilar ro'yxatini olishi mumkin. query turlari:
  /users?role=admin -> adminlar
	/users?role=customer -> xaridorlar
  /users?role=superAdmin -> superadmin
query bo'lmasa hamma foydalanuvchilar ro'yxati qaytadi
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-


===5=== "GET /users/me" yo'liga so'rovni barcha login qilgan foydalanuvchilar jo'nata oladi. Javob sifatida so'rov jo'natgan foydalanuvchininggina ma'lumotlari qaytadi.
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===6===  "DELETE /users/:id" yo'liga faqat admin va superAdmin so'rov jo'nata oladi.
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===7=== "PATCH /users/me" yo'li orqali barcha login qilgan foydalanuvchilar o'z ma'lumotini tahrir qilishi mumkin. req.bodyda jo'natilishi kerak:
  firstName - string/min-1 ta simvol/ixtiyoriy
  lastName - string/min-1 ta simvol/ixtiyoriy
  email - string/email bo'lishi shart/ixtiyoriy
  password - string/min-6 ta simvol/ixtiyoriy
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-

***firstName, lastName, email yoki password dan faqat bir yoki bir nechtasi jo'natilsa shular o'zgaradi, qolganlari o'zgarishsiz qolaveradi. 



==========BOOKS ROUTES======================================================

===8=== "POST /books" so'rovi orqali faqatgina adminlar yangi kitob qo'sha oladi. req.bodyda jo'natilishi kerak:
  title: string/.min-3 ta simvol/majburiy
  authorId: string/.min-3 ta simvol/majburiy
  category: string/'badiy', 'biznes', 'ilm-fan', 'siyosat' yoki 'boshqa' bo'lishi shart/majburiy
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-

***authorId ni olish uchun oldin "POST /authors" yo'li orqali authorni ro'yxatdan o'tkazsih kerak



===9=== "GET /books" yo'liga login bo'lgan foydalanuvchilar so'rov yuborib kitoblar ro'yxati va ma'lumotlarini olish mumkin. query turlari:
  /books?category=badiy
  /books?authorId=1234
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===10=== "GET /books/:id" so'rovi orqali barcha login qilgan foydalanuvchilar IDsi ko'rsatilgan kitob haqidagi ma'lumotlarni olishi mumkin
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===11=== "PUT /books/:id" yo'liga faqat adminlar so'rov jo'natib IDsi ko'rsatilgan kitobni tahrirlashi mumkin. req.bodyda jo'natilishi kerak:
  title: string/.min-3 ta simvol/
  authorId: string/.min-3 ta simvol/
  category: string/'badiy', 'biznes', 'ilm-fan', 'siyosat' yoki 'boshqa' bo'lishi shart/
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-

***title, authorId yoki category dan faqat bir yoki bir nechtasi jo'natilsa shular o'zgaradi, qolganlari o'zgarishsiz qolaveradi.



===12=== "DELETE /books/:id" yo'liga faqat adminlar so'rov jo'natib ko'rsatilgan kitobni o'chirib yuborishi mumkin
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



=========AUTHORS ROUTES=====================================================

===13=== "POST /authors" yo'li orqali faqatgina adminlar author qo'sha oladi. req.bodyda jo'natilishi kerak:
  name: string/min-3 ta simvol/majburiy
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-

***javob bilan birga authorId ham qaytadi. Yangi kitob yaratishda shu authorId dan foydalanish kerak



===14=== "GET /authors" yo'liga barcha login bo'lgan foydalanuvchilar so'rov jo'natib, mualliflar ro'yxati va ma'lumotini olishi mumkin
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===15=== "GET /authors/:id" yo'liga barcha login bo'lgan foydalanuvchilar so'rov jo'natib, ko'rsatilgan IDli muallif haqida ma'lumot va uning ro'yxatdan o'tgan kitoblari sonini olishi mumkin.
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===16=== "PUT /authors/:id" yo'li orqali faqatgina adminlar muallif ma'lumotlarini tahrirlashi mumkin. req.bodyda jo'natilishi kerak:
  name: string/min-3 ta simvol/majburiy
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-



===17=== "DELETE /authors/:id" yo'li o'rqali faqat adminlar muallifni o'chirishi mumkin. Agar muallifning hech bo'lmasa 1 ta kitobi bo'lsa ham o'chirib bo'lmaydi.
-!!!- so'rovda "Authorization: token" jo'natish shart -!!!-


============Passwords=====================================================
superAdmin
email: sardor@mail.ru
password: "12345678"

qolgan foydalanuvchilarni passwordi: "123456"