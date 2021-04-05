package ibm.skillstracker.project.associates;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssociateRepository extends CrudRepository<Associates, Integer> {

	List<Associates> findByAssociateMobileNo(String associateMobileNo);
	
	
	
	List<Associates> findByAssociateNameContaining(String associateName);

	List<Associates> findByAssociateEmail(String associateEmail);

	List<Associates> findBySkills_SkillName(String skillName);
	
	@Query(nativeQuery = true,value="select skillName from associateskills where associateId = :id")
	List<String> checkBySkillName(@Param("id") Integer associateId);

	@Transactional
	@Modifying
	@Query(nativeQuery = true,value="insert into associateskills(associateId,skillName,skillLevel) values(:id,:skillName,:skillLevel)")
	void addNewSkill(@Param("id")Integer associateId,
			@Param("skillName")String skillName,
			@Param("skillLevel")Integer integer);

	
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "delete from associateskills where associateId=:id and skillName=:skillName ")
	void deleteSkill(@Param("skillName") String skillName,@Param("id") Integer id);

	@Transactional
	@Modifying
	@Query(nativeQuery=true,value="insert into skillsentry(skill) values(:skill)")
	void addSkill(@Param("skill") String skill);

	@Query(nativeQuery = true,value="select skill from skillsentry")
	List<String> checkInSkillEntry();
	

	
	
//	@Transactional
//	@Modifying
//	@Query(nativeQuery = true, value = "update associates set associateName = :associateName ,associateMobileNo = :associateMobile ,associateEmail = :associateEmail where associateId = :associateId")
//	void editAssociate(@Param("associateName")String associateName,@Param("associateMobile")String associateMobile,@Param("associateEmail")String associateEmail,@Param("associateId")Integer associateId);
}
