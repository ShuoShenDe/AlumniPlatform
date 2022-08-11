package rem.ynu.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import rem.ynu.model.people;
import rem.ynu.service.peopleService;

@Controller
@RequestMapping("/people")
public class peopleController {
	@RequestMapping(value="/checkUsersubname.do")
	public@ResponseBody Boolean CheckUsersubname(String userSubname) throws Exception{
		return 	peopleService.CheckPeopleSubNameExist(userSubname);
	}
	@RequestMapping(value="/addUser.do")
	public void addUser(people peo) throws Exception{
		peopleService.AddPeople(peo);
	}
	@RequestMapping(value="/checkUser.do")
	public@ResponseBody int checkUser(String userSubname,String password) throws Exception{
		return 	peopleService.CheckPeople(userSubname, password);
	}
	@RequestMapping(value="/QueryPeopleByPosition.do")
	public@ResponseBody List<people> QueryPeopleByPosition(String peopleLocation,int queryRank) throws Exception{
		return 	peopleService.GetPeopleByLocation(peopleLocation, queryRank);
	}
}
