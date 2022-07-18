package didentity.amos.digitalIdentity.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ScheduledJobService {

    @Autowired
    private AutoIssueService autoIssueService;

    private static final int initialDelay = 5000;
    private static final int fixedDelay = 15000;

    private Logger logger = LoggerFactory.getLogger(ScheduledJobService.class);

    private int i = 0;

    // @Scheduled(fixedDelay = 5000, initialDelay = 1000)
    public void testSchueduler() {
        System.out.println("schedule: " + i);
        i++;
    }

    @Scheduled(fixedDelay = fixedDelay, initialDelay = initialDelay)
    public void checkActiveJobs() {
        logger.info("=================");
        logger.info("checking for jobs");
        autoIssueService.handleAutoIssueActions();

        logger.info("=================");

    }

}
