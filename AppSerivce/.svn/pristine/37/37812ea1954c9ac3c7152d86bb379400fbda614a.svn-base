package com.utility;

import cn.com.chinautrust.auth.deciphering.Encryption;
import cn.com.chinautrust.auth.deciphering.EncryptionFactory;
import org.apache.log4j.Logger;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.Control;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;
import java.util.*;


public class UserAuthenticate {
	private static String USERNAME = "";
	private static String PASSWORD = "";
    private static String URL = "";
    private static String BASEDN = "";
    private static String FACTORY = "";
    private static String MAXIDLE = "";
    private static String MINIDLE = "";
    private static String AUTHENSCHEMA = "";
    private static String TYPE = "";
    private static String MAXACTIVE = "";
    private static String CONNECTNAME = "";
    private LdapContext ctx = null;
    private Hashtable env = null;
    private Control[] connCtls = null;
    
    protected Logger logger = Logger.getLogger(getClass());
    
    public UserAuthenticate() {
    	String url = this.getClass().getResource("/").getPath();
    	Map map = Utility.getProperties(url + "appldap.properties");
    	USERNAME = (String) map.get("appldap.username");
    	PASSWORD = (String) map.get("appldap.password");
    	URL = (String) map.get("appldap.url");
    	BASEDN = (String) map.get("appldap.root");
    	MAXIDLE = (String) map.get("appldap.maxidle");
    	MINIDLE = (String) map.get("appldap.minidle");
    	FACTORY = (String) map.get("appldap.factory");
    	AUTHENSCHEMA = (String) map.get("appldap.authenSchema");
    	TYPE = (String) map.get("appldap.type");
    	MAXACTIVE = (String) map.get("appldap.maxactive");
    	CONNECTNAME = (String) map.get("appldap.connectname");
    }
    
    public static void main(String[] args) throws Exception {
    	UserAuthenticate ua=new UserAuthenticate();
    	String userId="LIPR";
    	//String userPwd=ua.test().get(userId);
    	//userPwd="2be98afc86aa7f2e4cb79ce10bec3fd89";
    	//ua.encryptions(userPwd);
    	Map map=ua.getSSOUserMap();
//    	System.out.println(" encryptions map=" +map);
    	//TODO
    	//ua.authenricate("sunbing","password");
    }

    public Map encryptions(Map map) {
    	Map returnMap=new HashMap();
    	Iterator iter=map.keySet().iterator();
    	while(iter.hasNext()){
    		String key=""+iter.next();
    		returnMap.put(key, encryptions(""+map.get(key)));    		
    	}	
    	return returnMap;
	}

    public String encryptions(String userPwd) {
		Encryption enc= EncryptionFactory.getEncryptions("SIMPLE");
		userPwd = enc.decrypt(userPwd);
		//System.out.println("encryptions decrypt  decrypt userPwd=="+userPwd); 
		return userPwd;
	}

    public Map getSSOUserMap(){ 
		
		Map map=new HashMap();
		
        String url = URL;
        
        String domain = BASEDN;
        String user = USERNAME;
        String password = PASSWORD;
        String authenSchema = AUTHENSCHEMA;
        String maxActive = MAXACTIVE;
        
        Hashtable<String, String> env = new Hashtable<String, String>();  
/*        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory"); // LDAP 工厂  
        
        env.put(Context.SECURITY_AUTHENTICATION, "simple"); // LDAP访问安全级别  
        env.put(Context.PROVIDER_URL, url);  
        env.put(Context.SECURITY_PRINCIPAL, user+","+domain); //  填DN
        
        env.put(Context.SECURITY_CREDENTIALS, password); // AD Password  
        env.put("java.naming.ldap.attributes.binary", "objectSid objectGUID");  */
        
                
        env.put(Context.INITIAL_CONTEXT_FACTORY,	"com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.SECURITY_AUTHENTICATION, 	authenSchema);
		env.put(Context.PROVIDER_URL, url);
		env.put(Context.SECURITY_PRINCIPAL, user);
		env.put(Context.SECURITY_CREDENTIALS, password);
		env.put("com.sun.jndi.ldap.connect.pool", 	"true");
		//连接空闲多长时间被回收
		env.put("com.sun.jndi.ldap.connect.pool.timeout", "300000");
		env.put("com.sun.jndi.ldap.connect.pool.prefsize", "50");
		env.put("com.sun.jndi.ldap.connect.pool.maxsize", maxActive);
		
        
        
        LdapContext ldapCtx = null;  
        try {  
            ldapCtx = new InitialLdapContext(env , null);  
            //queryGroup(ldapCtx);  
            //userpwd=queryEncryptedPassWord(ldapCtx,userId);  
            map=queryUserInfoMap(ldapCtx);
              
        } catch (NamingException e) {  
            e.printStackTrace();  
        } finally {  
            if(ldapCtx != null) {  
                try {  
                    ldapCtx.close();  
                } catch (NamingException e) {  
                }  
            }  
        }  
        return map;
        //return userpwd;
    }  
   /* private String queryEncryptedPassWord(LdapContext ldapCtx,String userId) throws NamingException { 
    	String userpwd="";
    	boolean bFindUser=false;
    	
    	 SearchControls searchCtls = new SearchControls();  
         searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);  
         String searchFilter = "objectClass=utrustbaseperson";  
         String searchBase = BASEDN;  
         String returnedAtts[] = {"uid", "objectGUID", "utrustpwd"};  
         searchCtls.setReturningAttributes(returnedAtts);  
         NamingEnumeration<SearchResult> answer = ldapCtx.search(searchBase, searchFilter, searchCtls);  
         while (answer.hasMoreElements()) {  
             SearchResult sr = answer.next();  
             Attributes Attrs = sr.getAttributes();  
             if (Attrs != null) {  
                 NamingEnumeration<?> ne = Attrs.getAll();  
                 while(ne.hasMore()) {  
                     Attribute Attr = (Attribute)ne.next();  
                     String name = Attr.getID();  
                     Enumeration<?> values = Attr.getAll();  
                     if (values != null) { // 迭代  
                         while (values.hasMoreElements()) {  
                             String value = "";  
                             if("objectGUID".equals(name)) {  
                                 value = UUID.nameUUIDFromBytes((byte[]) values.nextElement()).toString();  
                             } else {  
                                 value = (String)values.nextElement();  
                             }  
                             System.out.println("name="+name + "                            value=" + value);
                             
                             if("uid".equals(name) && userId.equals(value)){
                            	 bFindUser=true;
                            	 System.out.println("111111111111111111111111 userId="+value);
                            	 
                            	// break;                            	 
                             }   
                             if(bFindUser && "utrustpwd".equals(name)){
                            	 userpwd=value;
                            	 System.out.println("2222222222222222222222 userpwd="+value);
                            	 bFindUser=false;
                            	 break;                            	 
                             } 
                         }  
                     }  
                 }  
                 //System.out.println("queryUser_test =============queryUser_test  queryUser_test=======");  
             }  
         } 
         System.out.println("queryUser_test ==================userpwd="+userpwd); 
         return userpwd;
    }*/
    private Map queryUserInfoMap(LdapContext ldapCtx) throws NamingException { 
    	Map returnMap = new HashMap();  	

    	
    	 SearchControls searchCtls = new SearchControls();  
         searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);  
         String searchFilter = "objectClass=utrustbaseperson";  
         String searchBase = BASEDN;  
         String returnedAtts[] = {"uid", "objectGUID", "utrustpwd","cn","orgId","orgName"};  
         searchCtls.setReturningAttributes(returnedAtts);  
         NamingEnumeration<SearchResult> answer = ldapCtx.search(searchBase, searchFilter, searchCtls);  
         while (answer.hasMoreElements()) {  
          	String userId="";
         	Map mapPerson=new HashMap();
         	
             SearchResult sr = answer.next();  
             Attributes Attrs = sr.getAttributes();  
             if (Attrs != null) {  
                 NamingEnumeration<?> ne = Attrs.getAll();  
                 while(ne.hasMore()) {  
                	
                     Attribute Attr = (Attribute)ne.next();  
                     String name = Attr.getID();  
                     Enumeration<?> values = Attr.getAll();  
                     if (values != null) { // 迭代  
                         while (values.hasMoreElements()) {  
                             String value = (String)values.nextElement();  
                             if("uid".equals(name)){
                            	 userId=value;   
                            	 userId=userId.toUpperCase();
                             } 
                             if("utrustpwd".equals(name)){
                            	 value=encryptions(value);                            	                            	 
                             } 
                             logger.debug("name="+name + "  value=" + value);
                             mapPerson.put(name, value);                             
                         }  
                     }  
                 }  
                  
             }  
             returnMap.put(userId, mapPerson);
         } 
         //System.out.println("queryUserAndPassWordMap ="+map); 
         return returnMap;
    }
  private static void queryGroup(LdapContext ldapCtx) throws NamingException {  
        SearchControls searchCtls = new SearchControls();  
        searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);  
        String searchFilter = "objectClass=utrustdept";  
        String searchBase = "ou=myDeptSubDept,ou=myDept,dc=DS-66,dc=com";  
        searchBase="ou=deptment,ou=utrust,dc=chinautrust,dc=com";
        String returnedAtts[] = {"title", "objectGUID", "name"};  
        searchCtls.setReturningAttributes(returnedAtts);  
        NamingEnumeration<SearchResult> answer = ldapCtx.search(searchBase, searchFilter, searchCtls);  
        while (answer.hasMoreElements()) {  
            SearchResult sr = answer.next();  
            Attributes Attrs = sr.getAttributes();  
            if (Attrs != null) {  
                NamingEnumeration<?> ne = Attrs.getAll();  
                while(ne.hasMore()) {  
                    Attribute Attr = (Attribute)ne.next();  
                    String name = Attr.getID();  
                    Enumeration<?> values = Attr.getAll();  
                    if (values != null) { // 迭代  
                        while (values.hasMoreElements()) {  
                            String value = "";  
                            if("objectGUID".equals(name)) {  
                                value = UUID.nameUUIDFromBytes((byte[]) values.nextElement()).toString();  
                            } else {  
                                value = (String)values.nextElement();  
                            }  
//                            System.out.println("name="+name + "  value=" + value);
                        }  
                    }  
                }  
                System.out.println("=====================");  
            }  
        }  
          
    } 
    private void LDAP_connect(){
  /*
appldap.password=password12345
appldap.maxidle=20
appldap.minidle=3
appldap.authenSchema=simple
appldap.username=cn\=Directory Manager
appldap.type=2
appldap.root=ou\=utrust,dc\=chinautrust,dc\=com
appldap.maxactive=20
appldap.url=ldap\://127.0.0.1\:389
appldap.connectname=ldap
   *   
   *   	
   */
    	
        env = new Hashtable();
        env.put(Context.INITIAL_CONTEXT_FACTORY,FACTORY);
        env.put(Context.PROVIDER_URL, URL+BASEDN);//LDAP server
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        
        /*env.put("java.naming.factory.initial", "com.sun.jndi.ldap.LdapCtxFactory");    
        env.put("java.naming.provider.url", url.toString());    */
        env.put(Context.SECURITY_AUTHENTICATION, "simple");    
        env.put("java.naming.security.principal", USERNAME);    
        env.put("java.naming.security.credentials", PASSWORD);            
//此处若不指定用户名和密码,则自动转换为匿名登录
        
        try{
            ctx = new InitialLdapContext(env,connCtls);
        }catch(AuthenticationException e){
        	logger.error("Authentication faild: "+e.toString());
        }catch(Exception e){
        	logger.error("Something wrong while authenticating: "+e.toString());
        }
    }
    
    
    private String getUserDN(String email){
        String userDN = "";
        
        LDAP_connect();
        
        try{
               SearchControls constraints = new SearchControls();
               constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);
               NamingEnumeration en = ctx.search("", "mail="+email, constraints); //The UID you are going to query,* means all nodes
               if(en == null){
                System.out.println("Have no NamingEnumeration.");
               }
               if(!en.hasMoreElements()){
                System.out.println("Have no element.");
               }
               while (en != null && en.hasMoreElements()){//maybe more than one element
                   Object obj = en.nextElement();
                   if(obj instanceof SearchResult){
                       SearchResult si = (SearchResult) obj;
                       userDN += si.getName();
                       userDN += "," + BASEDN;
                   }
                   else{
                       System.out.println(obj);
                   }
                   System.out.println();
               }
              }catch(Exception e){
            	  logger.error("Exception in search():"+e);
              }
        
        return userDN;
    }
    
    
    public boolean authenricate(String ID,String password){
        boolean valide = false;
        String userDN = getUserDN(ID);
        
        try {
            ctx.addToEnvironment(Context.SECURITY_PRINCIPAL,userDN);
            ctx.addToEnvironment(Context.SECURITY_CREDENTIALS,password);
            ctx.reconnect(connCtls);
            System.out.println(userDN + " is authenticated");
            valide = true;
        }catch (AuthenticationException e) {
            System.out.println(userDN + " is not authenticated");
            System.out.println(e.toString());
            valide = false;
        }catch (NamingException e) {
            System.out.println(userDN + " is not authenticated");
            valide = false;
        }
        
        return valide;
    }
}