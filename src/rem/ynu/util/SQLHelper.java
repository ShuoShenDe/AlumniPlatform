package rem.ynu.util;

import java.io.*;
import java.security.MessageDigest;
import java.sql.*;
import java.util.*;

public class SQLHelper {
	// 定义所需的变量
	private static Connection ct = null;
	private static PreparedStatement ps = null;
	private static ResultSet rs = null;
	// 连接数据库参数
	private static String url = "";
	private static String username = "";
	private static String password = "";
	private static String driver = "";
	private static String databasename = "";
	private static Properties pp = null;
	private static InputStream fis = null;
	// 加载驱动 ，用一次
	static {
		try {
			// Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			pp = new Properties();
			// fis=new FileInputStream("dbinfo.properties");
			// 当我们做web 开发时加载文件要用类加载器
			fis = SQLHelper.class.getClassLoader().getResourceAsStream(
					"rem/ynu/util/dbinfo.properties");
			pp.load(fis);
			url = pp.getProperty("url");
			// databasename=pp.getProperty("databasename");
			driver = pp.getProperty("driver");
			username = pp.getProperty("username");
			password = pp.getProperty("password");
			Class.forName(driver);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	// 得到连接
	public static Connection getconnection() {
		try {
			ct = DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ct;
	}

	// 统一的static查询
	public static ResultSet executeQuery(String sql, String[] parameters) {
		try {
			ct = getconnection();
			ps = ct.prepareStatement(sql);
			if (parameters != null && !parameters.equals("")) {
				for (int i = 0; i < parameters.length; i++) {
					ps.setString(i + 1, parameters[i]);
				}
			}
			rs = ps.executeQuery();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
		return rs;
	}

	// 统一的static查询
	public static boolean executeQuery2(String sql, String[] parameters) {
		try {
			ct = getconnection();
			ps = ct.prepareStatement(sql);
			if (parameters != null && !parameters.equals("")) {
				for (int i = 0; i < parameters.length; i++) {
					if (i != parameters.length - 1) {
						ps.setString(i + 1, parameters[i]);
					} else {
						ps.setInt(i + 1, Integer.parseInt(parameters[i]));
					}

				}
			}
			ps.executeUpdate();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		} finally {
			// 关闭资源
			close(rs, ps, ct);
		}
		return true;
	}

	public static Connection getCt() {
		return ct;
	}

	public static void setCt(Connection ct) {
		SQLHelper.ct = ct;
	}

	public static PreparedStatement getPs() {
		return ps;
	}

	public static void setPs(PreparedStatement ps) {
		SQLHelper.ps = ps;
	}

	public static ResultSet getRs() {
		return rs;
	}

	public static void setRs(ResultSet rs) {
		SQLHelper.rs = rs;
	}

	// 执行更新相关操作
	public static void executeUpdate(String sql, String[] parameters) {
		// 1.先创建一个Ps
		try {
			ct = getconnection();
			ps = ct.prepareStatement(sql);
			// 给问号赋值
			if (parameters != null) {
				for (int i = 0; i < parameters.length; i++) {
					ps.setString(i + 1, parameters[i]);
				}
			}
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();// 开发阶段打印异常
			// 抛出异常,抛出运行异常可以给调用者调用该函数的函数一个选择
			// 可以处理，也可以放弃处理
			throw new RuntimeException(e.getMessage());
			// TODO: handle exception
		} finally {
			// 关闭资源
			close(rs, ps, ct);
		}
	}
	// 执行更新相关操作
	public static void executeUpdate2(String sql, String[] parameters) {
		// 1.先创建一个Ps
		try {
			ct = getconnection();
			ps = ct.prepareStatement(sql);
			int length=parameters.length;
			// 给问号赋值
			if (parameters != null) {
				for (int i = 0; i < length-2; i++) {
					ps.setString(i + 1, parameters[i]);
				}
			}
			ps.setDouble(length-1,Double.parseDouble(parameters[length-2]));
			ps.setDouble(length,Double.parseDouble(parameters[length-1]));
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();// 开发阶段打印异常
			// 抛出异常,抛出运行异常可以给调用者调用该函数的函数一个选择
			// 可以处理，也可以放弃处理
			throw new RuntimeException(e.getMessage());
			// TODO: handle exception
		} finally {
			// 关闭资源
			close(rs, ps, ct);
		}
	}
	// 关闭资源的函数
	public static void close(ResultSet rs, PreparedStatement ps, Connection ct) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (ps != null) {
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (ct != null) {
			try {
				ct.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	// MD5加密
	public final static String getMD5(String s) {

		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',

		'a', 'b', 'c', 'd', 'e', 'f' };

		try {

			byte[] strTemp = s.getBytes();

			// 使用MD5创建MessageDigest对象

			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			mdTemp.update(strTemp);

			byte[] md = mdTemp.digest();

			int j = md.length;

			char str[] = new char[j * 2];

			int k = 0;

			for (int i = 0; i < j; i++) {

				byte b = md[i];
				str[k++] = hexDigits[b >> 4 & 0xf];

				str[k++] = hexDigits[b & 0xf];

			}

			return new String(str);

		} catch (Exception e) {

			return null;

		}

	}
}
