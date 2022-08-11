package rem.ynu.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import rem.ynu.model.people;
import rem.ynu.util.SQLHelper;

public class peopleService {
	//判断一个用户别名是否存在
	static public boolean CheckPeopleSubNameExist(String subname) throws Exception
	{
		String sql="select * from ynu_people where subname=?";
		String[] paras={subname};
		ResultSet rs=SQLHelper.executeQuery(sql, paras);
		if(rs.next())
		{
		  return true;
		}else{
		  return false;
		}
	}
	static public void AddPeople(people peo)throws Exception
	{
		String sql="insert into ynu_people (name,subname,password,sex,bytime,major,factory,post,telephone,photoPath,address,clearAddress,longitude,latitude) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		String[] paras={peo.getName(),peo.getSubname(),SQLHelper.getMD5(peo.getPassword()),peo.getSex(),peo.getBytime(),peo.getMajor(),peo.getFactory(),peo.getPost(),peo.getTelephone(),"peopleUpload/people.png",peo.getAddress(),peo.getClearAddress(),peo.getLongitude()+"",peo.getLatitude()+""};
		SQLHelper.executeUpdate2(sql, paras);
	}
	//判断登录
	public static int CheckPeople(String usersubname,String password) throws Exception
	{
		String sql="select * from ynu_people where subname=? and password=?";
		String[] paras={usersubname,SQLHelper.getMD5(password)};
		ResultSet rs=SQLHelper.executeQuery(sql, paras);
		if(rs.next())
		{
			return rs.getInt(1);
		}else{
			return 0;
		}
	}
	//根据地理位置查找校友
	public static ArrayList<people> GetPeopleByLocation(String peopleLocation,int queryRank) throws Exception
	{
		ArrayList<people> arrPeo = new ArrayList<people>();
		if(queryRank==1)
		{
			String sql="select * from ynu_people where address=?";
			String[] paras={peopleLocation};
			ResultSet rs=SQLHelper.executeQuery(sql, paras);
			while(rs.next())
			{
				people peo = new people();
				peo.setName(rs.getString(2));
				peo.setSubname(rs.getString(3));
				peo.setSex(rs.getString(5));
				peo.setBytime(rs.getString(6));
				peo.setMajor(rs.getString(7));
				peo.setFactory(rs.getString(8));
				peo.setPost(rs.getString(9));
				peo.setPhotoPath(rs.getString(10));
				peo.setTelephone(rs.getString(11));
				peo.setAddress(rs.getString(12));
				peo.setClearAddress(rs.getString(13));
				peo.setLongitude(rs.getDouble(14));
				peo.setLatitude(rs.getDouble(15));
				arrPeo.add(peo);
			}
			return arrPeo;
		}else
		{
			String sql="select * from ynu_people where address LIKE ?";
			String[] paras={"%"+peopleLocation+"%"};
			ResultSet rs=SQLHelper.executeQuery(sql, paras);
			while(rs.next())
			{
				people peo = new people();
				peo.setName(rs.getString(2));
				peo.setSubname(rs.getString(3));
				peo.setSex(rs.getString(5));
				peo.setBytime(rs.getString(6));
				peo.setMajor(rs.getString(7));
				peo.setFactory(rs.getString(8));
				peo.setPost(rs.getString(9));
				peo.setPhotoPath(rs.getString(10));
				peo.setTelephone(rs.getString(11));
				peo.setAddress(rs.getString(12));
				peo.setClearAddress(rs.getString(13));
				peo.setLongitude(rs.getDouble(14));
				peo.setLatitude(rs.getDouble(15));
				arrPeo.add(peo);
			}
			return arrPeo;
		}
	}
}
