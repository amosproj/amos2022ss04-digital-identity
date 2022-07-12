package didentity.amos.digitalIdentity.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.responses.proofs.presentation.ProofResponse;
import didentity.amos.digitalIdentity.model.actions.AutoIssueAction;
import didentity.amos.digitalIdentity.repository.AutoIssueActionRepository;

@Service
public class ScheduledJobService {

    @Autowired
    private AutoIssueActionRepository autoIssueActionRepository;

    @Autowired
    private LissiApiService lissiApiService;

    @Value("${scheduler.jobs.initial.delay}")
    private static final int initialDelay = 5000;
    @Value("${scheduler.jobs.initial.delay}")
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
        handleAutoIssueActions();

        logger.info("=================");

    }

    private void handleAutoIssueActions() {
        Iterable<AutoIssueAction> autoIssueActions = autoIssueActionRepository.findAll();
        int found = 0;
        int completed = 0;
        int awaiting = 0;
        int timeouted = 0;
        logger.debug("checking for *auto issue credential on proof presentation* jobs (AutoIssueAction.class)");
        for (AutoIssueAction action : autoIssueActions) {
            logger.debug("Found AutoIssueAction:" + action);
            String exit = handleSingleAutoIssue(action);
            switch (exit) {
                case "completed":
                    found++;
                    completed++;
                    logger.debug("action completed:" + action);
                    break;
                case "timeout":
                    found++;
                    timeouted++;
                    logger.debug("action timeout:" + action);
                    break;
                case "await":
                    found++;
                    awaiting++;
                    logger.debug("action waiting:" + action);
                    break;
                default:
                case "error":
                    logger.debug("action timeout:" + action);

            }
        }
        logger.info("job stats for AutoIssueAction.class:" +
                "\tfound:" + found +
                "\tcompleted-tasks:" + completed +
                "\tawaiting-proof-presentation:" + awaiting +
                "\ttimeouted:" + timeouted);

    }

    /**
     * 
     * @param action
     * @return "completed" if the task is completed and can be removed; "error" if
     *         an api call was not successfull or something else broke; "timeout" it
     */
    private String handleSingleAutoIssue(AutoIssueAction action) {
        ResponseEntity<ProofResponse> response = lissiApiService.getProofPresentation(action.getExchangeId());
        if (response == null) {
            // TODO: if the proof presentation is deleted, it will result in an error and it
            // will never be returned.
            return "error";
        }

        ProofResponse proof = response.getBody();
        if (proof.getProof().getState().equalsIgnoreCase("VERIFIED")) {
            logger.debug("DONE:" + proof);
            return "completed";
        }

        // TODO
        // if(timeouted){
        // return "timeout";
        // }

        return "awating";
    }

}
