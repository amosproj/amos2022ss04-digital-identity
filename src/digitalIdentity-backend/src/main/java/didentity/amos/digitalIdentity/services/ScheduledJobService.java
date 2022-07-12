package didentity.amos.digitalIdentity.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.model.actions.AutoIssueAction;
import didentity.amos.digitalIdentity.repository.AutoIssueActionRepository;

@Service
public class ScheduledJobService {

    @Autowired
    private AutoIssueActionRepository autoIssueActionRepository;

    @Autowired

    @Value("${scheduler.jobs.initial.delay}")
    private static final int initialDelay = 5000;
    @Value("${scheduler.jobs.initial.delay}")
    private static final int fixedDelay = 5000;

    private Logger logger = LoggerFactory.getLogger(ScheduledJobService.class);

    private int i = 0;

    // @Scheduled(fixedDelay = 5000, initialDelay = 1000)
    public void testSchueduler() {
        System.out.println("schedule: " + i);
        i++;
    }

    @Scheduled(fixedDelay = fixedDelay, initialDelay = initialDelay)
    public void checkActiveJobs() {
        logger.info("checking for jobs");
        handleAutoIssueActions();

    }

    private void handleAutoIssueActions() {
        Iterable<AutoIssueAction> autoIssueActions = autoIssueActionRepository.findAll();
        int found = 0;
        int completed = 0;
        int timeouted = 0;
        logger.debug("checking for *auto issue credential on proof presentation* jobs (AutoIssueAction.class)");
        for (AutoIssueAction action : autoIssueActions) {
            logger.debug("Found AutoIssueAction:" + action);
            String exit = handleSingleAutoIssue(action);
            switch (exit) {
                case "completed":
                    completed++;
                    logger.debug("action completed:" + action);
                    break;
                case "timeout":
                    logger.debug("action timeout:" + action);
                    timeouted++;
                    break;
            }
            found++;
        }
        logger.info("job stats for AutoIssueAction.class:\t\t" +
                "found:" + found +
                "\tcompleted tasks:" + completed +
                "\ttimeouted:" + timeouted);

    }

    /**
     * 
     * @param action
     * @return
     */
    private String handleSingleAutoIssue(AutoIssueAction action) {

        return "";
    }

}
