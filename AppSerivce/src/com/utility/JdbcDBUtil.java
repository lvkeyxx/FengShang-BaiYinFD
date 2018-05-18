package com.utility;

import ipacs.dataaccess.service.ServiceManager;
import org.apache.log4j.Logger;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

public class JdbcDBUtil {
    protected Logger logger = Logger.getLogger(getClass());

    private DataSource dataSource;

    public JdbcDBUtil() {
        dataSource = (DataSource) ServiceManager.getService("dataSource");
    }
/*	
    public Connection getConnection() {
		try {
			return	dataSource.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}	
	}*/

/*	public String fectchClobString(String freeSql) throws SQLException {
		String strReturn="";
		Connection conn=dataSource.getConnection();
		Statement statement=conn.createStatement();
		ResultSet rs=statement.executeQuery(freeSql);
		if(rs.next()){
			Clob clob=rs.getClob(1);
			strReturn=Utility.ClobToString(clob);
		}
		rs.close();
		statement.close();
		conn.close();
		return strReturn;
	}*/

    public String fectchClobString(String freeSql) {
        String strReturn = "";
        Connection conn = null;
        Statement statement = null;
        ResultSet result = null;
        try {
            conn = dataSource.getConnection();
            statement = conn.createStatement();
            result = statement.executeQuery(freeSql);
            if (result.next()) {
                Clob clob = result.getClob(1);
                strReturn = Utility.ClobToString(clob);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();

        } finally {
            try {

                if (result != null)
                    result.close();
                if (statement != null)
                    statement.close();
                if (conn != null)
                    conn.close();
            } catch (Exception e) {
                logger.error(e.getMessage());
                e.printStackTrace();
            }
        }
        return strReturn;
    }

    /**
     * reid
     * 2017-12-04
     *
     * @param username
     * @param password
     * @param freeSql
     * @return
     * @throws SQLException
     */
    public List<Map> query(String username, String password, String freeSql) throws SQLException {
        boolean result = false;
        List<Map> list = null;
        Connection conn = null;
        Statement statement = null;
        try {
            conn = dataSource.getConnection(username, password);
            statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(freeSql);
            list = resultSetToList(rs);
            result = true;
        } catch (SQLException e) {
/*	    	logger.error(e.getMessage());
	        e.printStackTrace();
	        throw new Exception(e);*/
            throw e;
        } finally {
            try {
/*
	            if (result != null)
	                result.close();*/
                if (statement != null)
                    statement.close();
                if (conn != null)
                    conn.close();
            } catch (Exception e) {
                logger.error(e.getMessage());
                e.printStackTrace();
            }
        }
        return list;
    }

    public static List resultSetToList(ResultSet rs) throws SQLException {
        if (rs == null)
            return Collections.EMPTY_LIST;
        ResultSetMetaData md = rs.getMetaData(); //得到结果集(rs)的结构信息，比如字段数、字段名等   
        int columnCount = md.getColumnCount(); //返回此 ResultSet 对象中的列数   
        List list = new ArrayList();
        Map rowData = new HashMap();
        while (rs.next()) {
//        	System.out.println("xxx");
            rowData = new HashMap(columnCount);
            for (int i = 1; i <= columnCount; i++) {
//        	 System.out.println("md.getColumnName(i):"+md.getColumnName(i));
                rowData.put(md.getColumnName(i), rs.getObject(i));
            }
            list.add(rowData);
//         System.out.println("list:" + list.toString());
        }
        return list;
    }

    public boolean callProcedure(String username, String password, String freeSql) throws SQLException {
        boolean result = false;

        Connection conn = null;
        Statement statement = null;
        try {
            conn = dataSource.getConnection(username, password);
            statement = conn.createStatement();
            statement.executeQuery(freeSql);
            result = true;
        } catch (SQLException e) {
/*	    	logger.error(e.getMessage());
	        e.printStackTrace();
	        throw new Exception(e);*/
            throw e;
        } finally {
            try {
/*
	            if (result != null)
	                result.close();*/
                if (statement != null)
                    statement.close();
                if (conn != null)
                    conn.close();
            } catch (Exception e) {
                logger.error(e.getMessage());
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * 不需要用户名密码的sql执行
     * @param freeSql
     * @return
     * @throws SQLException
     */
    public boolean callProcedure(String freeSql) throws SQLException {
        boolean result = false;

        Connection conn = null;
        Statement statement = null;
        try {
            conn = dataSource.getConnection();
            statement = conn.createStatement();
            statement.executeQuery(freeSql);
            result = true;
        } catch (SQLException e) {
            throw e;
        } finally {
            try {
                if (statement != null)
                    statement.close();
                if (conn != null)
                    conn.close();
            } catch (Exception e) {
                logger.error(e.getMessage());
                e.printStackTrace();
            }
        }
        return result;
    }
}
