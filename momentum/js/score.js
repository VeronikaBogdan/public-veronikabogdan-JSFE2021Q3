console.log(	
	`Score: 119 / 150`,
	`
	1. Часы и календарь +15
	2. Приветствие +10
	3. Смена фонового изображения +20
	4. Виджет погоды +15
	5. Виджет цитата дня +10/10
	6. Аудиоплеер +15
	7. Продвинутый аудиоплеер +0/20
	8. Перевод приложения на два языка 15/15
	9. Получение фонового изображения от API +10 
	(Сейчас работает Unsplash API, но сделано также и для изображений из git hub, и для  Flickr API 
		(можете посмотреть в коде...  
		// setBg();  -- функция изображений из gh
		getLinkToImage();  -- функция изображений из Unsplash API
		// getLinkToImageFlickr(); ))-- функция изображений из Flickr API
	10. Настройки приложения +9/20
			- в настройках приложения можно указать язык приложения (en/ru или en/be) +3
			- в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API +3  ???? in process
			- если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото +0/3
			- в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал +3
			- скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их +3
			= настройки приложения сохраняются при перезагрузке страницы +0/5
	`
);
// const e=["font-size: 30px; color: rgb(2, 120, 151); text-decoration: underline;","font-size: 14px; color: rgb(2, 120, 151);","font-size: 14px; color: #fff; background-color: #8AB4F8; border-radius: 35%; padding: 2px;","font-size: 12px; color: rgb(2, 120, 151);"];console.log("%cСамооценка",e[0])

